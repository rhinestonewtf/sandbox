import { contracts } from "@/src/constants/contracts";
import { Account } from "../../Account";
import { InitialModule } from "../Module";
import { encodeAbiParameters } from "viem";

export const getInstallColdStorageHookData = (
  account: Account,
  lockTime: number
): InitialModule => {
  return {
    module: contracts.COLD_STORAGE_HOOK_ADDRESS,
    data: encodeAbiParameters(
      [
        {
          name: "waitPeriod",
          type: "uint128",
        },
        {
          name: "owner",
          type: "address",
        },
      ],
      [BigInt(lockTime * 86400), account.address]
    ),
  };
};
