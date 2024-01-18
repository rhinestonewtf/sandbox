"use client";

import { fetchAccounts } from "../api";
import { Spinner } from "@/src/ui-kit";
import { useActiveAccount } from "../hooks";
import { useRouter } from "next/navigation";
import { useFetchAccountData } from "../hooks";
import { PropsWithChildren, useEffect } from "react";
import { useActiveNetwork } from "../../Network/hooks";
import { useIsUserOpInProgress } from "../../UserOperation/hooks";
import { useIsTransactionInProgress } from "../../Transaction/hooks";

export const AccountLoader = ({ children }: PropsWithChildren) => {
  const [activeAccount, setActiveAccount] = useActiveAccount();
  const [activeNetwork] = useActiveNetwork();
  const [isUserOpInProgress] = useIsUserOpInProgress();
  const [isTransactionInProgress] = useIsTransactionInProgress();
  const fetchAccountData = useFetchAccountData();

  const router = useRouter();

  const _fetchAccount = async () => {
    try {
      const accounts = await fetchAccounts();

      console.log(accounts);

      if (!accounts?.length) {
        return router.push("/login");
      }

      setActiveAccount({
        ...activeAccount,
        ...accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchAccount();
  }, []);

  // refetch account data when user changes network or after creating a user op
  useEffect(() => {
    if (activeAccount.address) {
      fetchAccountData().then(([balance]) => {
        setActiveAccount({
          ...activeAccount,
          balance,
        });
      });
    }
  }, [
    activeNetwork,
    isUserOpInProgress,
    isTransactionInProgress,
    activeAccount.address,
  ]);

  if (!activeAccount.address || !activeNetwork) {
    return <Spinner />;
  }

  return <>{children}</>;
};
