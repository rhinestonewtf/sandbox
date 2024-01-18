import { Address } from "viem";
import { useState } from "react";
import { UserOperation } from "permissionless";
import { WebauthnCredential } from "../../User";
import { ConfigureValidatorView } from "./views";
import { notReachable } from "@/src/utils/notReachable";
import { updateAccount } from "@/src/domains/Account/api";
import { useActiveAccount } from "@/src/domains/Account/hooks";
import { useActiveNetwork } from "@/src/domains/Network/hooks";
import { useCreateUserOp } from "@/src/domains/UserOperation/hooks";
import { UserOpStatusView } from "@/src/domains/UserOperation/components";
import { installValidator } from "@/src/domains/Account/api/installModule";
import {
  getInstallECDSAData,
  getInstallWebauthnData,
} from "@/src/domains/Module/api/validators";
import { contracts } from "@/src/constants/contracts";

type Props = {
  onClose: () => void;
};

type ViewState =
  | {
      type: "configure_validator_view";
    }
  | {
      type: "transaction_submitted_view";
      userOp: UserOperation;
    };

export const ConfigureValidatorFlow = ({ onClose }: Props) => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "configure_validator_view",
  });

  const [activeAccount] = useActiveAccount();
  const [activeNetwork] = useActiveNetwork();
  const createUserOp = useCreateUserOp();

  const onSaveValidatorClick = async ({
    walletSigner,
    webAuthnCredential,
    address,
  }: {
    walletSigner?: string;
    webAuthnCredential?: WebauthnCredential;
    address: string;
  }) => {
    let userOp;

    if (!activeAccount.webauthnKeyId && webAuthnCredential) {
      const webauthnInstallData = getInstallWebauthnData(
        contracts,
        webAuthnCredential
      );

      const actions = await installValidator(
        activeNetwork,
        activeAccount,
        webauthnInstallData.module,
        webauthnInstallData.data
      );

      if (actions.length) {
        userOp = await createUserOp.mutateAsync({
          name: `Add Passkey signer`,
          actions,
        });
      }
    }

    if (!activeAccount.walletSigner && walletSigner) {
      const ECDSAInstallData = getInstallECDSAData(
        contracts,
        walletSigner as Address
      );
      const actions = await installValidator(
        activeNetwork,
        activeAccount,
        ECDSAInstallData.module,
        ECDSAInstallData.data
      );
      if (actions.length) {
        userOp = await createUserOp.mutateAsync({
          name: `Add eoa signer`,
          actions,
        });
      }
    }

    await updateAccount({
      address,
      walletSigner: !!walletSigner ? walletSigner : undefined,
      webauthnKeyId: webAuthnCredential?.id,
    });

    if (userOp) {
      setViewState({
        type: "transaction_submitted_view",
        userOp,
      });
    }
  };

  switch (viewState.type) {
    case "configure_validator_view":
      return (
        <ConfigureValidatorView
          // isLoading={createUserOp.isLoading}
          isLoading={false}
          onSaveClick={onSaveValidatorClick}
        />
      );

    case "transaction_submitted_view":
      return (
        <UserOpStatusView userOp={viewState.userOp} onFinishClick={onClose} />
      );
    default:
      return notReachable(viewState);
  }
};
