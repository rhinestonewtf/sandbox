"use client";
import { useState } from "react";
import { SendView } from "./views";
import { UserOperation } from "permissionless";
import { formatAddress } from "@/src/utils/common";
import { notReachable } from "@/src/utils/notReachable";
import { Address, encodeFunctionData, parseAbi } from "viem";
import { useActiveNetwork } from "@/src/domains/Network/hooks";
import { useCreateUserOp } from "@/src/domains/UserOperation/hooks";
import { ERC20Token } from "@/src/domains/Token/ERC20Token/ERC20Token";
import { UserOpStatusView } from "@/src/domains/UserOperation/components";
import { getFormattedAmount } from "@/src/domains/Token/ERC20Token/helpers";

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
    token,
    address,
    amount,
  }: {
    token: ERC20Token;
    address: string;
    amount: number;
  }) => {
    let userOp;

    if (token.symbol !== activeNetwork.nativeCurrency.symbol) {
      const calldata = encodeFunctionData({
        functionName: "transfer",
        abi: parseAbi([
          "function transfer(address to, uint256 amount) public returns (bool)",
        ]),
        args: [
          address as Address,
          BigInt(amount * 10 ** Number(token.decimals)),
        ],
      });

      userOp = await createUserOp.mutateAsync({
        name: `Send ${amount.toFixed(2)} ${token.symbol}`,
        actions: [
          {
            target: token.token_address as Address,
            value: BigInt(0),
            callData: calldata,
          },
        ],
      });
    } else {
      userOp = await createUserOp.mutateAsync({
        name: `Send ${amount.toFixed(4)} ${token.symbol}`,
        actions: [
          {
            target: address as Address,
            value: BigInt(amount * 10 ** Number(token.decimals)),
            callData: "0x",
          },
        ],
      });
    }

    onTransactionSubmitted();

    setViewState({
      type: "submitted_view",
      sentAmount: getFormattedAmount({ token, amount, activeNetwork }),
      recipient: address,
      userOp,
    });
  };

  switch (viewState.type) {
    case "send_view":
      return (
        <SendView
          onSendClick={onSendClick}
          // isUserOpCreated={createUserOp.isLoading} // todo: fix this
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
