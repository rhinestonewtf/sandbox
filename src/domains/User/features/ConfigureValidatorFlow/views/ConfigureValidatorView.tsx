"use client";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "@/src/ui-kit";
import { createCredential } from "../../../api";
import { ConnectSigner } from "@/src/components";
import { WebauthnCredential } from "../../../User";
import { SignItem } from "../../../components/SignItem";
import { useActiveAccount } from "../../../../Account/hooks";
import { parseCreateResponse } from "../../../helpers/webauthn";

type Props = {
  isLoading: boolean;
  onSaveClick: ({
    address,
    walletSigner,
    webAuthnCredential,
  }: {
    address: string;
    walletSigner?: string;
    webAuthnCredential?: WebauthnCredential;
  }) => void;
};

export const ConfigureValidatorView = ({ isLoading, onSaveClick }: Props) => {
  const [activeAccount] = useActiveAccount();
  const [signer, setSigner] = useState("");

  const [credential, setCredential] = useState<WebauthnCredential>();

  const onCreateCredentialClick = async () => {
    if (activeAccount.webauthnKeyId) return;
    const _credential = await createCredential();
    const publicKey = parseCreateResponse(
      _credential.response.attestationObject
    );
    const formattedCredential: WebauthnCredential = {
      id: _credential.id,
      publicKey,
    };
    setCredential(formattedCredential);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      <div className="text-2xl font-medium mt-[100px]">
        Let&apos;s secure your account
      </div>
      <div className="w-[416px] text-slate-900 text-base font-normal leading-normal mt-1 mb-8">
        Set up at least one method for signing transactions
      </div>

      <ConnectSigner
        onSignerChanged={setSigner}
        selectedSigner={activeAccount.walletSigner}
        disabled={!!activeAccount.walletSigner}
      />

      <div className="mt-4" />

      <SignItem
        variant="passkeys"
        title="Passkey"
        subTitle="Sign transactions using your biometrics"
        isSelected={!!activeAccount.webauthnKeyId || !!credential}
        onClick={onCreateCredentialClick}
        disabled={!!activeAccount.webauthnKeyId}
      />

      <Button
        isLoading={isLoading}
        className={classNames(
          "text-white text-xs font-medium font-mono uppercase leading-none w-[320px] mt-[92px] bg-primary hover:bg-primary disabled:bg-indigo-600 disabled:bg-opacity-20 disabled:text-indigo-600 disabled:text-opacity-60 disabled:cursor-not-allowed"
        )}
        disabled={!signer && !credential}
        onClick={() => {
          onSaveClick({
            address: activeAccount.address,
            walletSigner: signer,
            webAuthnCredential: credential,
          });
        }}
      >
        Save
      </Button>
    </div>
  );
};
