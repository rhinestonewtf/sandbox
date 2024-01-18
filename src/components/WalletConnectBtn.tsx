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
    // try {
    //   const callbackUrl = "/";
    //   const message = new SiweMessage({
    //     domain: window.location.host,
    //     address: address,
    //     statement: "Sign in with Ethereum to Rhinestone.",
    //     uri: window.location.origin,
    //     version: "1",
    //     chainId: chain?.id,
    //     nonce: await getCsrfToken(),
    //   });
    //   const signature = await signMessageAsync({
    //     message: message.prepareMessage(),
    //   });
    //   await signIn("credentials", {
    //     message: JSON.stringify(message),
    //     callbackUrl,
    //     redirect: false,
    //     signature,
    //   });
    //   onLoginClick();
    // } catch (err) {
    //   console.log(err);
    // }
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
