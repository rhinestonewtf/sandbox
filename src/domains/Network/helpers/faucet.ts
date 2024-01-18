import { Network } from "../Network";
import { Hex, getAddress, parseEther } from "viem";

import {
  getWalletClient,
  getPublicClient,
} from "@/src/domains/Network/helpers";

export async function getCoinFromFaucet(
  network: Network,
  amount: string,
  recipient: string
) {
  const walletClient = getWalletClient(
    process.env.NEXT_PUBLIC_FAUCET_KEY! as Hex,
    network
  );
  const publicClient = getPublicClient(network);

  const hash = await walletClient.sendTransaction({
    to: getAddress(recipient),
    value: parseEther(amount),
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  return receipt;
}
