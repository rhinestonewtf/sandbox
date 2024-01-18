"use client";
import Image from "next/image";
import { GoogleIcon, LargeButton } from "@/src/ui-kit";
import { WalletConnectBtn } from "@/src/components/WalletConnectBtn";

type Props = {
  onLoginClick: () => void;
};

export const LoginView = ({ onLoginClick }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image width={200} height={200} alt="" src="/modules.png" />

      <div className="font-medium text-2xl">
        Welcome to the Rhinestone Playground!
      </div>
      <div className="w-[448px] text-base font-normal leading-normal mt-2">
        Build and test smart account modules in the environment of a modular
        smart wallet
      </div>

      <p className="font-mono text-mono uppercase text-gray-800 mt-[28px] mb-[32px]">
        Create an account to get started
      </p>
      <div className="flex flex-col gap-6">
        <LargeButton
          className="bg-primary hover:bg-primary border-none"
          contentClassName="font-normal !text-primary-content"
          onClick={async () => {
            onLoginClick();
          }}
        >
          Create account
        </LargeButton>
      </div>
    </div>
  );
};
