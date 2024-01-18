"use client";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "@/src/ui-kit";
import { BackButton } from "@/src/components";
import { SignItem } from "../../../components";
import { createCredential } from "../../../api";
import { ConnectSigner } from "@/src/components";
import { WebauthnCredential } from "../../../User";
import { parseCreateResponse } from "../../../helpers/webauthn";

type Props = {
  onBackClick: () => void;
  onProfileSecurityCompleted: () => void;
};

export const ProfileSecurityView = ({
  onBackClick,
  onProfileSecurityCompleted,
}: Props) => {
  const getCredential = () => {
    const credential = localStorage.getItem(`webauthnCredential`);
    return credential ? JSON.parse(credential) : undefined;
  };
  const [credential, setCredential] = useState<WebauthnCredential>(
    getCredential()
  );
  const [signer, setSigner] = useState(localStorage.getItem(`signer`));

  const isSignerSelected = !!signer || !!credential;

  const onCreateCredentialClick = async () => {
    if (credential) return;
    const _credential = await createCredential();
    const publicKey = parseCreateResponse(
      _credential.response.attestationObject
    );
    const formattedCredential: WebauthnCredential = {
      id: _credential.id,
      publicKey,
    };
    setCredential(formattedCredential);
    localStorage.setItem(
      `webauthnCredential`,
      JSON.stringify(formattedCredential)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      <div className="text-2xl font-medium mt-[100px]">
        Let&apos;s secure your account
      </div>
      <div className="w-[416px] text-slate-900 text-base font-normal leading-normal mt-1 mb-8">
        Set up at least one method for signing transactions
      </div>

      <div className="absolute left-0 top-0">
        <BackButton onClick={onBackClick} />
      </div>

      <ConnectSigner onSignerChanged={setSigner} />

      <div className="mt-4" />

      <SignItem
        variant="passkeys"
        title="Passkey"
        subTitle="Sign transactions using your biometrics"
        isSelected={!!credential}
        onClick={onCreateCredentialClick}
      />

      <Button
        className={classNames(
          "text-white text-xs font-medium font-mono uppercase leading-none w-[320px] mt-[92px] bg-primary hover:bg-primary disabled:bg-indigo-600 disabled:bg-opacity-20 disabled:text-indigo-600 disabled:text-opacity-60 disabled:cursor-not-allowed"
        )}
        disabled={!signer && !credential}
        onClick={onProfileSecurityCompleted}
      >
        {isSignerSelected ? "Continue" : "Set up signer"}
      </Button>
    </div>
  );
};
