import { contracts } from "@/src/constants/contracts";
import { Account } from "../../Account";
import { InitialModule } from "../Module";
import { FallbackParam, encodeFallbackParams } from "../utils/fallback";

export const getInstallExtensibleFallbackHandlerData = (
  account: Account,
  fallbackParams: FallbackParam[]
): InitialModule => {
  return {
    module: contracts.EXTENSIBLE_FALLBACK_HANDLER_ADDRESS,
    data:
      fallbackParams.length > 0 ? encodeFallbackParams(fallbackParams) : "0x",
  };
};
