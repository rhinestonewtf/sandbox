import { AccountBalance } from "../Account";
import { useActiveNetwork } from "../../Network/hooks";
import { useGetAccountBalance } from "../api";

export const useFetchAccountData = () => {
  const [activeNetwork] = useActiveNetwork();
  const { refetch: fetchAccountBalance } = useGetAccountBalance();

  const fetchAccountData = async (): Promise<[AccountBalance]> => {
    const [balance] = await Promise.all([fetchAccountBalance()]);

    return [
      balance.data || {
        balance: "0",
        symbol: activeNetwork.nativeCurrency.symbol,
      },
    ];
  };

  return fetchAccountData;
};
