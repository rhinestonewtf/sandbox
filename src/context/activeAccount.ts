import { Address, Hex } from "viem";
import { Account } from "@/src/domains/Account";
import { Dispatch, SetStateAction, createContext } from "react";

export const ActiveAccountContext = createContext<{
  activeAccount: Account;
  setActiveAccount: Dispatch<SetStateAction<Account>>;
}>({
  activeAccount: {
    address: "" as Address,
    salt: "",
    webauthnKeyId: "",
    initCode: "" as Hex,
    deployedOnNetworks: [],
    balance: { balance: "0", symbol: "ETH" },
  },
  setActiveAccount: () => {},
});
