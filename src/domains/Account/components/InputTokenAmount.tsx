"use client";

import { useEffect, useState } from "react";
import { InputAmount } from "@/src/ui-kit/Input";
import { useActiveAccount } from "../hooks";

type Props = {
  label: string;
  value?: string;
  disabled?: boolean;
  onAmountChange: (amount: string) => void;
};

export const InputTokenAmount = ({
  label,
  value,
  disabled,
  onAmountChange,
}: Props) => {
  const [amount, setAmount] = useState<string | undefined>(value);
  const [activeAccount] = useActiveAccount();

  useEffect(() => {
    setAmount(value);
  }, [value]);

  return (
    <InputAmount
      value={amount}
      title={label}
      placeHolder="0.00"
      label={`Balance: ${activeAccount.balance.balance} ${activeAccount.balance.symbol}`}
      onChange={(_value) => {
        setAmount(_value);
        onAmountChange(_value);
      }}
      disabled={disabled}
      tokenSelector={<div />}
    />
  );
};
