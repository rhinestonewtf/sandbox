"use client";
import { useEffect } from "react";
import { useModal } from "connectkit";
import { LargeButton, WalletConnectIcon } from "../ui-kit";
import { useAccount, useNetwork, useSignMessage } from "wagmi";

type Props = {
  onLoginClick: () => void;
};

export const WalletConnectBtn = ({ onLoginClick }: Props) => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { setOpen, open } = useModal();

  const handleLogin = async () => {
    onLoginClick();
  };

  useEffect(() => {
    if (isConnected && open) {
      handleLogin();
    }
  }, [isConnected, open]);

  return (
    <LargeButton
      icon={<WalletConnectIcon />}
      onClick={() => {
        if (!isConnected) {
          setOpen(true);
        } else {
          handleLogin();
        }
      }}
    >
      WalletConnect
    </LargeButton>
  );
};
