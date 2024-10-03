import { Account } from "../../Account";
import { useGetNonce } from "./useGetNonce";
import { createAndSignUserOp } from "../api";
import { Validator } from "../../Module/Module";
import { ExecuteAction } from "../UserOperation";
import { useQueueUserOp } from "./useQueueUserOps";
import { useMutation } from "@tanstack/react-query";
import { getUserOperationHash } from "permissionless";
import { useActiveNetwork } from "../../Network/hooks";
import { EntryPoint } from "permissionless/_types/types";
import { useActiveAccount, useActiveValidator } from "../../Account/hooks";
import { contracts } from "@/src/constants/contracts";

export const useCreateUserOp = (account?: Account) => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();
  const [activeValidator] = useActiveValidator();
  const queueUserOp = useQueueUserOp();
  const { getNonce } = useGetNonce(account);

  const defaultOperationProps = {
    network: activeNetwork,
    activeAccount: account || activeAccount,
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
    const _account = account || activeAccount;
    const nonce = await getNonce();
    const userOp = await createAndSignUserOp({
      ...defaultOperationProps,
      activeAccount: _account,
      actions,
      nonce,
      chosenValidator: validator || activeValidator,
    });

    const hash = getUserOperationHash({
      userOperation: userOp,
      entryPoint: contracts.ENTRY_POINT_ADDRESS as EntryPoint,
      chainId: activeNetwork.id,
    });

    console.log("UserOp hash", hash);

    queueUserOp({ name, signedOp: userOp, hash, callback });

    return userOp;
  };

  const createUserOp = useMutation({
    mutationFn: _createUserOp,
  });
  return createUserOp;
};
