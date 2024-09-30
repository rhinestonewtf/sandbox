"use client";

import { Button } from "@/src/ui-kit";
import { ClaimButton } from "./ClaimButton";

import { ReceiveIcon, SendIcon } from "@/src/ui-kit/Icons";

type Props = {
  onSendClick: () => void;
  onReceiveClick: () => void;
};

export const AccountActions = ({ onSendClick, onReceiveClick }: Props) => {
  return (
    <div className="flex gap-2 font-mono uppercase">
      <ClaimButton />
      <Button
        className="regular-neutral w-32 h-[36px] btn-xs gap-2 pl-1 font-medium"
        onClick={onSendClick}
      >
        <SendIcon />
        Send & Swap
      </Button>
      <Button
        className="regular-neutral w-24 h-[36px] btn-xs gap-1 pl-0 font-medium"
        onClick={onReceiveClick}
      >
        <ReceiveIcon />
        Receive
      </Button>
    </div>
  );
};
