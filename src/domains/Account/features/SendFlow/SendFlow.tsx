"use client";
import { useState } from "react";
import { SendView } from "./views";
import { UserOperation } from "permissionless";
import { formatAddress } from "@/src/utils/common";
import { notReachable } from "@/src/utils/notReachable";
import { Address, encodeFunctionData, parseAbi } from "viem";
import { useActiveNetwork } from "@/src/domains/Network/hooks";
import { useCreateUserOp } from "@/src/domains/UserOperation/hooks";
import { UserOpStatusView } from "@/src/domains/UserOperation/components";

type ViewState =
  | { type: "send_view" }
  | {
      type: "submitted_view";
      sentAmount: string;
      recipient: string;
      userOp: UserOperation;
    };

type Props = {
  onTransactionSubmitted: () => void;
  onClose: () => void;
};

export const SendFlow = ({ onTransactionSubmitted, onClose }: Props) => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "send_view",
  });
  const [activeNetwork] = useActiveNetwork();
  const createUserOp = useCreateUserOp();

  const onSendClick = async ({
    address,
    amount,
  }: {
    address: Address;
    amount: number;
  }) => {
    let userOp;

    userOp = await createUserOp.mutateAsync({
      name: `Send ${amount.toFixed(4)} ${activeNetwork.nativeCurrency.symbol}`,
      actions: [
        {
          target: address as Address,
          value: BigInt(
            amount * 10 ** Number(activeNetwork.nativeCurrency.decimals)
          ),
          callData: "0x",
        },
      ],
    });

    onTransactionSubmitted();

    setViewState({
      type: "submitted_view",
      sentAmount: amount.toFixed(4),
      recipient: address,
      userOp,
    });
  };

  switch (viewState.type) {
    case "send_view":
      return (
        <SendView
          onSendClick={onSendClick}
          // isUserOpCreated={createUserOp.isLoading}
          isUserOpCreated={false}
        />
      );
    case "submitted_view":
      return (
        <UserOpStatusView
          title={`You're sending ${viewState.sentAmount} to ${formatAddress(
            viewState.recipient
          )}`}
          subTitle={`We're processing this transaction now`}
          userOp={viewState.userOp}
          onFinishClick={onClose}
        />
      );
    default:
      return notReachable(viewState);
  }
};
