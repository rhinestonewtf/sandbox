import { Address, Hex } from "viem";

export type Account = {
  address: Address;
  salt: string;
  webauthnKeyId: string;
  walletSigner?: string;
  initCode: Hex;
  deployedOnNetworks: number[];
  balance: AccountBalance;
};

export type AccountBalance = { balance: string; symbol: string };
