import { Network } from "../Network";
import { privateKeyToAccount } from "viem/accounts";
import { Address, createWalletClient, http } from "viem";

export const getWalletClient = (privateKey: Address, network: Network) => {
  return createWalletClient({
    transport: http(network.rpcUrl),
    chain: network,
    account: privateKeyToAccount(privateKey),
  });
};
