import { useEffect, useState } from "react";
import { getAccountNonce } from "permissionless";
import { useActiveNetwork } from "../../Network/hooks";
import { usePendingUserOps } from "./usePendingUserOps";
import { getPublicClient } from "../../Network/helpers";
import { useActiveAccount, useActiveValidator } from "../../Account/hooks";
import { contracts } from "@/src/constants/contracts";

export const useGetNonce = () => {
  const [activeNetwork] = useActiveNetwork();
  const [activeAccount] = useActiveAccount();
  const [pendingUserOps] = usePendingUserOps();
  const [nonce, setNonce] = useState<BigInt>(BigInt(0));
  const [activeValidator] = useActiveValidator();

  const _getNonce = async () => {
    const publicClient = getPublicClient(activeNetwork);
    const _nonce = await getAccountNonce(publicClient, {
      sender: activeAccount.address,
      entryPoint: contracts.ENTRY_POINT_ADDRESS,
      key: BigInt(activeValidator.address || 0),
    });

    if (pendingUserOps.length) {
      const nextNonce =
        Number(pendingUserOps[pendingUserOps.length - 1].signedOp.nonce) + 1;
      setNonce(BigInt(nextNonce));
    } else {
      setNonce(_nonce);
    }
  };

  useEffect(() => {
    _getNonce();
  }, [activeAccount, activeNetwork, pendingUserOps.length, activeValidator]);

  return nonce;
};
