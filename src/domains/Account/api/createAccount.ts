import { Network } from "../../Network";
import { useQuery } from "@tanstack/react-query";
import { WebauthnCredential } from "../../User/User";
import { getPublicClient } from "../../Network/helpers";
import Bootstrap from "@/src/constants/abis/Bootstrap.json";
import AccountFactory from "@/src/constants/abis/AccountFactory.json";
import { EmptyInitialModule, InitialModule } from "../../Module/Module";
import {
  getInstallECDSAData,
  getInstallWebauthnData,
} from "../../Module/api/validators";
import { ContractDependencies, contracts } from "@/src/constants/contracts";
import {
  Address,
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  keccak256,
  slice,
  stringToBytes,
} from "viem";

type Params = {
  webauthnCredential?: WebauthnCredential;
  walletSigner?: string;
  salt: string;
  network: Network;
};

export const createAccount = async ({
  webauthnCredential,
  walletSigner,
  salt,
  network,
}: Params) => {
  const saltNonce = keccak256(stringToBytes(salt));

  const initialValidators = getInitialValidators(
    contracts,
    walletSigner,
    webauthnCredential
  );
  return await getAccount({
    network,
    salt: saltNonce,
    contractDependencies: contracts,
    initialValidators,
  });
};

function getInitialValidators(
  contractDependencies: ContractDependencies,
  walletSigner: string | undefined,
  webAuthnCredential: WebauthnCredential | undefined
) {
  const initialValidators: InitialModule[] = [];
  if (walletSigner) {
    const ECDSAInstallData = getInstallECDSAData(
      contractDependencies,
      walletSigner as Address
    );
    initialValidators.push(ECDSAInstallData);
  }
  if (webAuthnCredential) {
    const webauthnInstallData = getInstallWebauthnData(
      contractDependencies,
      webAuthnCredential
    );
    initialValidators.push(webauthnInstallData);
  }
  return initialValidators;
}

function getInitializationData(
  contractDependencies: ContractDependencies,
  initialValidators: InitialModule[],
  initialExecutors: InitialModule[] = [],
  initialHook: InitialModule = EmptyInitialModule,
  initialFallback: InitialModule = EmptyInitialModule
): Hex {
  if (initialFallback == EmptyInitialModule) {
    initialFallback = {
      module: contractDependencies.EXTENSIBLE_FALLBACK_HANDLER_ADDRESS,
      data: "0x",
    };
  }
  const initCallData = encodeFunctionData({
    abi: Bootstrap.abi,
    functionName: "initMSA",
    args: [initialValidators, initialExecutors, initialHook, initialFallback],
  });
  return encodeAbiParameters(
    [
      { name: "bootstrap", type: "address" },
      { name: "initCallData", type: "bytes" },
    ],
    [contractDependencies.BOOTSTRAP_ADDRESS, initCallData]
  );
}

export function getInitializationDataFromInitcode(initCode: Hex): {
  initialValidators: InitialModule[];
  initialExecutors: InitialModule[];
  initialHook: InitialModule;
  initialFallback: InitialModule;
} {
  const { args: initCodeArgs } = decodeFunctionData({
    abi: AccountFactory.abi,
    data: slice(initCode, 20),
  });

  if (initCodeArgs?.length !== 2) {
    throw new Error("Invalid init code");
  }

  const initCallData = decodeAbiParameters(
    [
      { name: "bootstrap", type: "address" },
      { name: "initCallData", type: "bytes" },
    ],
    initCodeArgs[1] as Hex
  );

  const { args: initCallDataArgs } = decodeFunctionData({
    abi: Bootstrap.abi,
    data: initCallData[1],
  });

  if (initCallDataArgs?.length !== 4) {
    throw new Error("Invalid init code");
  }

  return {
    initialValidators: initCallDataArgs[0] as InitialModule[],
    initialExecutors: initCallDataArgs[1] as InitialModule[],
    initialHook: initCallDataArgs[2] as InitialModule,
    initialFallback: initCallDataArgs[3] as InitialModule,
  };
}

export async function getAccountAddress(
  network: Network,
  factoryAddress: Address,
  salt: Hex,
  initializationData: Hex
): Promise<Address> {
  const publicClient = getPublicClient(network);

  return (await publicClient.readContract({
    address: factoryAddress,
    abi: AccountFactory.abi,
    functionName: "getAddress",
    args: [salt, initializationData],
  })) as Address;
}

type GetAccoutParams = {
  network: Network;
  salt: Hex;
  contractDependencies: ContractDependencies;
  initialValidators: InitialModule[];
  initialExecutors?: InitialModule[];
  initialHook?: InitialModule;
  initialFallback?: InitialModule;
};

export async function getAccount({
  network,
  salt,
  contractDependencies,
  initialValidators,
  initialExecutors,
  initialHook = EmptyInitialModule,
  initialFallback = EmptyInitialModule,
}: GetAccoutParams) {
  const initializationData = getInitializationData(
    contractDependencies,
    initialValidators,
    initialExecutors,
    initialHook,
    initialFallback
  );
  const address = await getAccountAddress(
    network,
    contractDependencies.ACCOUNT_FACTORY_ADDRESS,
    salt,
    initializationData
  );
  const initCode = encodePacked(
    ["address", "bytes"],
    [
      contractDependencies.ACCOUNT_FACTORY_ADDRESS,
      encodeFunctionData({
        abi: AccountFactory.abi,
        functionName: "createAccount",
        args: [salt, initializationData],
      }),
    ]
  );

  return {
    address,
    initCode,
  };
}

export const useCreateAccount = (params: Params) => {
  return useQuery({
    queryKey: ["account"],
    queryFn: () => {
      return createAccount({
        ...params,
      });
    },
    enabled: false,
  });
};
