import { Network } from "../../Network";
import { Account } from "../../Account";
import { Validator } from "../../Module/Module";
import { getBundlerClient } from "@/src/utils/userOps";
import { validators } from "@/src/constants/contracts";
import { getPublicClient } from "../../Network/helpers";
import { EntryPoint } from "permissionless/_types/types";
import AccountInterface from "@/src/constants/abis/Account.json";
import {
  UserOperation,
  getAccountNonce,
  getUserOperationHash,
} from "permissionless";
import {
  Hex,
  concat,
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  pad,
  slice,
  toHex,
} from "viem";
import {
  TransactionDetailsForUserOp,
  UserOperationStruct,
  ExecuteAction,
} from "@/src/domains/UserOperation/UserOperation";
import { contracts } from "@/src/constants/contracts";

export const CALL_TYPE = {
  SINGLE: "0x0000000000000000000000000000000000000000000000000000000000000000",
  BATCH: "0x0100000000000000000000000000000000000000000000000000000000000000",
};

type createAndSubmitUserOpParams = {
  actions: ExecuteAction[];
  network: Network;
  activeAccount: Account;
  nonce: BigInt;
  chosenValidator: Validator;
};

export async function createAndSignUserOp({
  actions,
  network,
  activeAccount,
  nonce,
  chosenValidator,
}: createAndSubmitUserOpParams) {
  const op = await createUnsignedUserOp(
    {
      actions,
    },
    network,
    nonce,
    activeAccount,
    chosenValidator
  );
  return await signUserOp(op, network, activeAccount, chosenValidator);
}

export async function createUnsignedUserOp(
  info: TransactionDetailsForUserOp,
  network: Network,
  nonce: BigInt,
  activeAccount: Account,
  chosenValidator: Validator
): Promise<UserOperation<"v0.7">> {
  const callData = await encodeUserOpCallData(info);
  const initCode = await getUserOpInitCode(network, activeAccount);

  const publicClient = getPublicClient(network);
  const currentNonce = await getAccountNonce(publicClient, {
    sender: activeAccount.address,
    entryPoint: contracts.ENTRY_POINT_ADDRESS as EntryPoint,
    key: BigInt(pad(chosenValidator.address, { dir: "right", size: 24 }) || 0),
  });

  const partialUserOp: UserOperation<"v0.7"> = {
    sender: activeAccount.address,
    // @dev mock nonce used for estimating gas
    // @dev using the latest nonce will revert during estimation
    nonce: currentNonce,
    // initCode: initCode,
    callData: callData,
    // @dev mock signature used for estimating gas
    signature: chosenValidator.mockSignature,
    factory: initCode == "0x" ? undefined : slice(initCode, 0, 20),
    factoryData: initCode == "0x" ? undefined : slice(initCode, 20),
    maxFeePerGas: BigInt(0),
    maxPriorityFeePerGas: BigInt(0),
    preVerificationGas: BigInt(0),
    verificationGasLimit: BigInt(0),
    callGasLimit: BigInt(0),
  };

  const bundlerClient = getBundlerClient(network);

  const gasPriceResult = await bundlerClient.getUserOperationGasPrice();

  partialUserOp.maxFeePerGas = gasPriceResult.fast.maxFeePerGas;
  partialUserOp.maxPriorityFeePerGas = gasPriceResult.fast.maxPriorityFeePerGas;

  const gasEstimate = await bundlerClient.estimateUserOperationGas({
    userOperation: partialUserOp,
  });

  partialUserOp.preVerificationGas = gasEstimate.preVerificationGas;
  partialUserOp.verificationGasLimit = gasEstimate.verificationGasLimit;

  partialUserOp.callGasLimit = gasEstimate.callGasLimit;

  // reset signature
  partialUserOp.signature = "" as Hex;

  // add correct nonce
  partialUserOp.nonce = nonce as bigint;

  return {
    ...partialUserOp,
  };
}

export async function signUserOp(
  userOp: UserOperation<"v0.7">,
  network: Network,
  activeAccount: Account,
  chosenValidator: Validator
): Promise<UserOperation<"v0.7">> {
  const userOpHash = getUserOperationHash({
    userOperation: userOp,
    chainId: network.id,
    entryPoint: contracts.ENTRY_POINT_ADDRESS as EntryPoint,
  });

  userOp.signature = await chosenValidator.signMessageAsync(
    userOpHash,
    activeAccount
  );

  return userOp;
}

export async function submitUserOpToBundler(
  userOp: UserOperation<"v0.7">,
  network: Network,
  activeAccount: Account
): Promise<string> {
  const bundlerClient = getBundlerClient(network);
  return await bundlerClient.sendUserOperation({
    userOperation: userOp,
  });
}

export async function encodeUserOpCallData(
  detailsForUserOp: TransactionDetailsForUserOp
): Promise<Hex> {
  const actions = detailsForUserOp.actions;
  if (actions.length === 0) {
    throw new Error("No actions");
  } else if (actions.length === 1) {
    const { target, value, callData } = actions[0];
    return encodeFunctionData({
      functionName: "execute",
      abi: AccountInterface.abi,
      args: [
        CALL_TYPE.SINGLE,
        encodePacked(
          ["address", "uint256", "bytes"],
          [target, BigInt(Number(value)), callData]
        ),
      ],
    });
  } else {
    return encodeFunctionData({
      functionName: "execute",
      abi: AccountInterface.abi,
      args: [
        CALL_TYPE.BATCH,
        encodeAbiParameters(
          [
            {
              components: [
                {
                  name: "target",
                  type: "address",
                },
                {
                  name: "value",
                  type: "uint256",
                },
                {
                  name: "callData",
                  type: "bytes",
                },
              ],
              name: "Execution",
              type: "tuple[]",
            },
          ],
          // @ts-ignore
          [actions]
        ),
      ],
    });
  }
}

async function getUserOpInitCode(
  network: Network,
  account: Account
): Promise<Hex> {
  if ((await isContract(network, account)) == false) {
    return account.initCode;
  }
  return "0x";
}

async function isContract(
  network: Network,
  account: Account
): Promise<boolean> {
  if (account.deployedOnNetworks.includes(network.id)) {
    return true;
  }

  const publicClient = getPublicClient(network);
  const code = await publicClient.getBytecode({ address: account.address });
  return code !== undefined;
}
