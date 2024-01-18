"use client";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { SignItem } from "../domains/User/components";
import { useConnectModal } from "@rainbow-me/rainbowkit";

type Props = {
  title?: string;
  subTitle?: string;
  selectedSigner?: string;
  disabled?: boolean;
  onSignerChanged: (signer: string) => void;
};

export const ConnectSigner = ({
  title,
  subTitle,
  selectedSigner,
  onSignerChanged,
  disabled,
}: Props) => {
  const { address, isConnected } = useAccount();
  const { openConnectModal, connectModalOpen: open } = useConnectModal();
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

  useEffect(() => {
    if (isConnected && open) {
      console.log("here");
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
          !disabled && openConnectModal ? openConnectModal() : null;
        }}
      />
    </>
  );
};
