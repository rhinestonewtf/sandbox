"use client";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { useEffect, useState } from "react";
import { SignItem } from "../domains/User/components";

type Props = {
  selectedSigner?: string;
  disabled?: boolean;
  onSignerChanged: (signer: string) => void;
};

export const ConnectSigner = ({
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

  useEffect(() => {
    if (isConnected) {
      onSignerChanged(address as string);
    }
  }, [isConnected]);

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
