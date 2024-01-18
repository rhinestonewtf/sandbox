import { useActiveAccount } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { useActiveNetwork } from "../../Network/hooks";

export const fetchAccounts = async () => {
  return JSON.parse(localStorage.getItem(`accounts`) ?? "[]");
};

export const useFetchAccounts = () => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();

  return useQuery({
    queryKey: ["account", activeNetwork.id, activeAccount.address],
    queryFn: () => fetchAccounts(),
    enabled: false,
  });
};
