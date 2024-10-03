"use client";
import { useEffect } from "react";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";
import { LargeButton, WalletConnectIcon } from "../ui-kit";

type Props = {
  onLoginClick: () => void;
};

export const WalletConnectBtn = ({ onLoginClick }: Props) => {
  const { isConnected } = useAccount();
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
