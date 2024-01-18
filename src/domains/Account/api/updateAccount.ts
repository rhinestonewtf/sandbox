import { Account } from "../Account";
import { useMutation } from "@tanstack/react-query";
import { fetchAccounts } from "./fetchAccounts";

type Params = {
  address: string;
  deployedOnNetworks?: number[];
  walletSigner?: string;
  webauthnKeyId?: string;
};
export const updateAccount = async ({
  address,
  deployedOnNetworks,
  walletSigner,
  webauthnKeyId,
}: Params) => {
  const accounts = await fetchAccounts();
  const account = accounts.find((a: Account) => a.address === address);
  const accountIndex = accounts.indexOf(account);
  if (account) {
    account.deployedOnNetworks =
      deployedOnNetworks ?? account.deployedOnNetworks;
    account.walletSigner = walletSigner ?? account.walletSigner;
    account.webauthnKeyId = webauthnKeyId ?? account.webauthnKeyId;
    accounts.splice(accountIndex, 1, account);
    localStorage.setItem(`accounts`, JSON.stringify(accounts));
  }
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: updateAccount,
  });
};
