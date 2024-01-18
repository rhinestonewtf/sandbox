import { Address, Hex, parseAbi } from "viem";
import { Network } from "@/src/domains/Network";
import {
  getWalletClient,
  getPublicClient,
} from "@/src/domains/Network/helpers";

export async function mintToken(
  contract: Address,
  target: string,
  _amount: string,
  network: Network
) {
  const walletClient = getWalletClient(
    process.env.NEXT_PUBLIC_FAUCET_KEY! as Hex,
    network
  );
  const publicClient = getPublicClient(network);
  const abi = [
    "function mint(address to, uint256 amount) external",
    "function decimals() external view returns (uint8)",
  ];

  const decimals = (await publicClient.readContract({
    address: contract,
    functionName: "decimals",
    abi: parseAbi(abi),
    args: [],
  })) as number;

  const amount = BigInt(_amount) * BigInt(10 ** decimals);

  const hash = await walletClient.writeContract({
    address: contract,
    abi: parseAbi(abi),
    functionName: "mint",
    args: [target, amount],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  return receipt;
}
