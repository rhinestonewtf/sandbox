import { Stepper } from "@/src/ui-kit";
import { useEffect, useState } from "react";
import { UserOperation } from "permissionless";
import { getUserOperationHash } from "permissionless";
import { getBundlerClient } from "@/src/utils/userOps";
import { useActiveNetwork } from "../../Network/hooks";
import { useActiveAccount } from "../../Account/hooks";
import { contracts } from "@/src/constants/contracts";

type Props = {
  userOp: UserOperation;
};

const steps = ["Submitted", "Processing", "Executed"];

export const UserOpStepper = ({ userOp }: Props) => {
  const [completed, setCompleted] = useState(false);
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();

  const userOperationHash = getUserOperationHash({
    userOperation: userOp,
    chainId: activeNetwork.id,
    entryPoint: contracts.ENTRY_POINT_ADDRESS,
  });

  useEffect(() => {
    getBundlerClient(activeNetwork)
      .waitForUserOperationReceipt({
        hash: userOperationHash,
      })
      .then(() => {
        setCompleted(true);
      });
  }, []);

  return <Stepper steps={steps} isComplete={completed} currentStep={2} />;
};
