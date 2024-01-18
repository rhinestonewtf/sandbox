import { Network } from "../../Network";
import { Account } from "../../Account";
import { Validator } from "../../Module/Module";
import { getBundlerClient } from "@/src/utils/userOps";
import { getPublicClient } from "../../Network/helpers";
import AccountInterface from "@/src/constants/abis/Account.json";
import { Address, Hex, encodeFunctionData, encodeAbiParameters } from "viem";
import {
  UserOperation,
  getAccountNonce,
  getUserOperationHash,
} from "permissionless";
import {
  TransactionDetailsForUserOp,
  UserOperationStruct,
  ExecuteAction,
} from "@/src/domains/UserOperation/UserOperation";
import { contracts } from "@/src/constants/contracts";

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
): Promise<UserOperationStruct> {
  const callData = await encodeUserOpCallData(info);
  const initCode = await getUserOpInitCode(network, activeAccount);

  const publicClient = getPublicClient(network);
  const currentNonce = await getAccountNonce(publicClient, {
    sender: activeAccount.address,
    entryPoint: contracts.ENTRY_POINT_ADDRESS,
    key: BigInt(chosenValidator.address),
  });

  const partialUserOp: any = {
    sender: activeAccount.address,
    // @dev mock nonce used for estimating gas
    // @dev using the latest nonce will revert during estimation
    nonce: currentNonce,
    initCode: initCode,
    callData: callData,
    paymasterAndData: "0x",
    // @dev mock signature used for estimating gas
    signature: chosenValidator.mockSignature,
  };

  const bundlerClient = getBundlerClient(network);
  const gasPriceResult = await bundlerClient.getUserOperationGasPrice();
  partialUserOp.maxFeePerGas = gasPriceResult.standard.maxFeePerGas;
  partialUserOp.maxPriorityFeePerGas =
    gasPriceResult.standard.maxPriorityFeePerGas;

  const gasEstimate = await bundlerClient.estimateUserOperationGas({
    userOperation: partialUserOp,
    entryPoint: contracts.ENTRY_POINT_ADDRESS,
  });

  partialUserOp.preVerificationGas = gasEstimate.preVerificationGas;
  partialUserOp.verificationGasLimit = gasEstimate.verificationGasLimit;
  partialUserOp.callGasLimit = gasEstimate.callGasLimit;

  // reset signature
  partialUserOp.signature = "";

  // add correct nonce
  partialUserOp.nonce = nonce;

  return {
    ...partialUserOp,
  };
}

export async function signUserOp(
  userOp: UserOperationStruct,
  network: Network,
  activeAccount: Account,
  chosenValidator: Validator
): Promise<UserOperationStruct> {
  const userOpHash = getUserOperationHash({
    userOperation: userOp,
    chainId: network.id,
    entryPoint: contracts.ENTRY_POINT_ADDRESS,
  });
  const signature = await chosenValidator.signMessageAsync(
    userOpHash,
    activeAccount
  );
  userOp.signature = signature;
  return userOp;
}

export async function submitUserOpToBundler(
  userOp: UserOperation,
  network: Network,
  activeAccount: Account
): Promise<string> {
  const bundlerClient = getBundlerClient(network);
  return await bundlerClient.sendUserOperation({
    userOperation: userOp,
    entryPoint: contracts.ENTRY_POINT_ADDRESS,
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
      args: [target, value, callData],
    });
  } else {
    return encodeFunctionData({
      functionName: "executeBatch",
      abi: AccountInterface.abi,
      args: [actions],
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
