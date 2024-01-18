"use client";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { useEffect, useState } from "react";
import { SignItem } from "../domains/User/components";

type Props = {
  title?: string;
  subTitle?: string;
  selectedSigner?: string;
  disabled?: boolean;
  onSignerChanged: (signer: string) => void;
};

import { ConnectKitButton } from "connectkit";

export const ExampleButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button onClick={show} style={{}}>
            {isConnected ? address : "Custom Connect"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export const ConnectSigner = ({
  title,
  subTitle,
  selectedSigner,
  onSignerChanged,
  disabled,
}: Props) => {
  const { address, isConnected } = useAccount();
  const { setOpen, open } = useModal();
  const [signer, setSigner] = useState(
    localStorage.getItem(`signer`) || selectedSigner
  );

  useEffect(() => {
    if (!isConnected) {
      setSigner("");
      localStorage.setItem(`signer`, "");
      onSignerChanged("");
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (session) {
  //     if (session.isWalletSession) {
  //       setSigner(address as string)
  //       onSignerChanged(address as string)
  //       localStorage.setItem(`${session.user?.email}-signer`, address as string)
  //     }
  //   }
  // }, [session])

  useEffect(() => {
    if (isConnected && open) {
      localStorage.setItem(`signer`, address as string);
      setSigner(address as string);
      onSignerChanged(address as string);
    }
  }, [isConnected, open]);

  return (
    <>
      <SignItem
        variant="eoa"
        title="EOA Wallet"
        subTitle="Sign transactions using your existing wallet"
        isSelected={!!signer}
        onClick={() => {
          !disabled && setOpen(true);
        }}
      />
    </>
  );
};
