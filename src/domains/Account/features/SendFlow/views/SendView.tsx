"use client";

import { Address, isAddress } from "viem";
import { useState } from "react";
import { InputText } from "@/src/ui-kit/Input";
import { LargeButton, Layout } from "@/src/ui-kit";
import { SideHeader } from "@/src/ui-kit/SideHeader";
import { NetworkSwitcher } from "../../../../Network/components";
import { InputTokenAmount } from "../../../components/InoutTokenAmount";

type Props = {
  isUserOpCreated: boolean;
  onSendClick: ({
    address,
    amount,
  }: {
    address: Address;
    amount: number;
  }) => void;
};

export const SendView = ({ isUserOpCreated, onSendClick }: Props) => {
  const [address, setAddress] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();

  const isSendEnabled =
    address && isAddress(address) && amount && Number(amount) > 0;

  const getButtonText = () => {
    if (!address || !isAddress(address)) {
      return "Enter recipient";
    }
    if (!amount) {
      return "Enter amount";
    }
    return "Execute";
  };

  return (
    <Layout>
      <Layout.Header>
        <SideHeader
          title="Send crypto"
          subTitle="Transfer tokens to any address on any chain"
        />
      </Layout.Header>

      <Layout.Content>
        <div className="flex flex-col w-[448px] mt-[146px] gap-2">
          <InputTokenAmount label="Token to send" onAmountChange={setAmount} />
          <InputText
            value={address}
            title="Recipient"
            placeHolder="ETH address or ENS name"
            onChange={setAddress}
          />
        </div>
      </Layout.Content>
      <Layout.Footer>
        <LargeButton
          className="bg-primary hover:bg-primary border-none disabled:bg-indigo-600 disabled:bg-opacity-20 disabled:text-red-600"
          contentClassName="font-normal !text-primary-content"
          isLoading={isUserOpCreated}
          disabled={!isSendEnabled || isUserOpCreated}
          onClick={() =>
            isSendEnabled &&
            onSendClick({ address, amount: parseFloat(amount) })
          }
        >
          {getButtonText()}
        </LargeButton>
      </Layout.Footer>
    </Layout>
  );
};
