import { AccountBalance } from "../Account";
import { useActiveNetwork } from "../../Network/hooks";
import { useGetAccountBalance } from "../api";
import { useGetUserTokens } from "../../Token/ERC20Token/api";
import { ERC20Token } from "../../Token/ERC20Token/ERC20Token";

export const useFetchAccountData = () => {
  const [activeNetwork] = useActiveNetwork();
  const { refetch: fetchAccountBalance } = useGetAccountBalance();
  const { refetch: fetchUserTokens } = useGetUserTokens();

  const fetchAccountData = async (): Promise<
    [AccountBalance, ERC20Token[]]
  > => {
    const [balance, tokens] = await Promise.all([
      fetchAccountBalance(),
      fetchUserTokens(),
    ]);

    return [
      balance.data || {
        balance: "0",
        symbol: activeNetwork.nativeCurrency.symbol,
      },
      tokens.data || [],
    ];
  };

  return fetchAccountData;
};
