import { Address, parseAbi } from "viem";
import { ERC20Token } from "../ERC20Token";
import { Account } from "../../../Account";
import { Network } from "../../../Network";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "../../../Account/hooks";
import { useActiveNetwork } from "../../../Network/hooks";
import { ERC20Tokens } from "../../api/data";
import { getPublicClient } from "@/src/domains/Network/helpers";

type Params = {
  account: Pick<Account, "address">;
  network: Network;
};

export async function getTokens({
  account,
  network,
}: Params): Promise<ERC20Token[]> {
  const publicClient = getPublicClient(network);
  const tokens: ERC20Token[] = [];
  for (const token of ERC20Tokens) {
    const data = (await publicClient.readContract({
      address: token.token_address as Address,
      abi: parseAbi([
        "function balanceOf(address _owner) public view returns (uint256 balance)",
      ]),
      functionName: "balanceOf",
      args: [account.address],
    })) as bigint;
    console.log(data);
    if (data && data > BigInt(0)) {
      const _token: ERC20Token = {
        ...token,
        balance: String(Number(data) * 10 ** token.decimals),
      };
    }
  }
  return tokens;
}

export const useGetUserTokens = () => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();

  return useQuery<ERC20Token[], Error>({
    queryKey: ["tokens", activeNetwork.id, activeAccount.address],
    queryFn: () =>
      getTokens({ account: activeAccount, network: activeNetwork }),
    enabled: false,
    retry: false,
  });
};
