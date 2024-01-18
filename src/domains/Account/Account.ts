import { Address, Hex } from "viem";
import { ERC20Token } from "../Token/ERC20Token/ERC20Token";

export type Account = {
  address: Address;
  salt: string;
  webauthnKeyId: string;
  walletSigner?: string;
  initCode: Hex;
  deployedOnNetworks: number[];
  tokens: ERC20Token[];
  balance: AccountBalance;
};

export type AccountBalance = { balance: string; symbol: string };
