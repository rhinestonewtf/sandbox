import { Account } from "../Account";
import { Address, Hex, zeroAddress } from "viem";

export type Module = {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  screenshotUrls: string[];
  category: "security" | "automation" | "privacy";
  version: string;
  developer: string;
  networks: string[];
  audit: string;
  moduleIconUrl: string;
  longDesc: string;
  label?: string;
  subLabel?: string;
  state: "AVAILABLE" | "UNAVAILABLE";
  name:
    | "autosavings"
    | "virtual_cold_storage"
    | "smart_actions"
    | "smart_shield"
    | "portfolio_management"
    | "stealth_addresses";
};

export type InitialModule = {
  module: Address;
  data: Hex;
};

export const EmptyInitialModule: InitialModule = {
  module: zeroAddress,
  data: "0x",
};

export type Validator = {
  name: "webauthn" | "ecdsa";
  address: Address;
  mockSignature: Hex;
  signMessageAsync: (message: Hex, activeAccount: Account) => Promise<Hex>;
};
