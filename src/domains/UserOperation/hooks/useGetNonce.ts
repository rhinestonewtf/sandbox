import { pad } from "viem";
import { Account } from "../../Account";
import { getAccountNonce } from "permissionless";
import { useActiveNetwork } from "../../Network/hooks";
import { usePendingUserOps } from "./usePendingUserOps";
import { getPublicClient } from "../../Network/helpers";
import { EntryPoint } from "permissionless/_types/types";
import { useActiveAccount, useActiveValidator } from "../../Account/hooks";
import { contracts } from "@/src/constants/contracts";

export const useGetNonce = (account?: Account) => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();
  const [pendingUserOps] = usePendingUserOps();
  const [activeValidator] = useActiveValidator();

  const selectedAccount = account || activeAccount;

  const getNonce = async () => {
    const publicClient = getPublicClient(activeNetwork);
    const _nonce = await getAccountNonce(publicClient, {
      sender: selectedAccount.address,
      entryPoint: contracts.ENTRY_POINT_ADDRESS as EntryPoint,
      key: BigInt(
        pad(activeValidator.address, {
          dir: "right",
          size: 24,
        }) || 0
      ),
    });

    if (pendingUserOps.length) {
      const nextNonce =
        Number(pendingUserOps[pendingUserOps.length - 1].signedOp.nonce) + 1;
      return BigInt(nextNonce);
    } else {
      return _nonce;
    }
  };
  return { getNonce };
};
