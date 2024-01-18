import { Account } from "../../Account";
import { useGetNonce } from "./useGetNonce";
import { createAndSignUserOp } from "../api";
import { Validator } from "../../Module/Module";
import { ExecuteAction } from "../UserOperation";
import { useQueueUserOp } from "./useQueueUserOps";
import { useMutation } from "@tanstack/react-query";
import { getUserOperationHash } from "permissionless";
import { useActiveNetwork } from "../../Network/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useActiveAccount, useActiveValidator } from "../../Account/hooks";
import { contracts } from "@/src/constants/contracts";

export const useCreateUserOp = () => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();
  const [activeValidator] = useActiveValidator();
  const queueUserOp = useQueueUserOp();
  const queryClient = useQueryClient();
  const nonce = useGetNonce();

  const defaultOperationProps = {
    network: activeNetwork,
    activeAccount: activeAccount,
  };

  const _createUserOp = async ({
    name,
    actions,
    account,
    validator,
    callback,
  }: {
    name: string;
    actions: ExecuteAction[];
    account?: Account;
    validator?: Validator;
    callback?: () => void;
  }) => {
    const userOp = await createAndSignUserOp({
      ...defaultOperationProps,
      activeAccount: account || activeAccount,
      actions,
      nonce,
      chosenValidator: validator || activeValidator,
    });

    const hash = getUserOperationHash({
      userOperation: userOp,
      entryPoint: contracts.ENTRY_POINT_ADDRESS,
      chainId: activeNetwork.id,
    });

    queueUserOp({ name, signedOp: userOp, hash, callback });

    return userOp;
  };

  const createUserOp = useMutation({
    mutationFn: _createUserOp,
    onSuccess: () => {
      // queryClient.invalidateQueries([]);
    },
  });
  return createUserOp;
};
