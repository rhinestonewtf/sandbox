import { contracts } from "@/src/constants/contracts";
import { Account } from "../../Account";
import { InitialModule } from "../Module";

export const getInstallFlashLoanLenderData = (
  activeAccount: Account
): InitialModule => {
  return {
    module: contracts.FLASHLOAN_LENDER_ADDRESS,
    data: "0x",
  };
};
