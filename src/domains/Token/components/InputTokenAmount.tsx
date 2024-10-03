"use client";

import { useEffect, useState } from "react";
import { TokenSwitcher } from "./TokenSwitcher";
import { InputAmount } from "@/src/ui-kit/Input";
import { ERC20Token } from "../ERC20Token/ERC20Token";
import { useActiveAccount } from "../../Account/hooks";
import { getFormattedTokenBalance } from "../ERC20Token/helpers";
import { useActiveNetwork } from "../../Network/hooks";

type Props = {
  label: string;
  value?: string;
  tokensList: ERC20Token[];
  disabled?: boolean;
  selectedTokenIndex?: number;
  onTokenChange: (token: ERC20Token) => void;
  onAmountChange: (amount: string) => void;
  tokenBalance?: string;
};

export const InputTokenAmount = ({
  label,
  value,
  tokensList = [],
  disabled,
  selectedTokenIndex,
  tokenBalance,
  onAmountChange,
  onTokenChange,
}: Props) => {
  const [token, setToken] = useState<ERC20Token>();
  const [amount, setAmount] = useState<string | undefined>(value);
  const [formattedTokenBalance, setFormattedTokenBalance] =
    useState<string>("");
  const [activeAccount] = useActiveAccount();
  const [activeNetwork] = useActiveNetwork();

  const getBalance = async () => {
    const balance = await getFormattedTokenBalance({
      tokenBalance,
      activeNetwork,
      token,
      accountBalance: activeAccount.balance,
      accountAddress: activeAccount.address,
    });
    setFormattedTokenBalance(balance);
  };

  useEffect(() => {
    getBalance();
  }, [token, activeAccount.balance]);

  useEffect(() => {
    setAmount(value);
  }, [value]);

  return (
    <InputAmount
      value={amount}
      title={label}
      placeHolder="0.00"
      label={`Balance: ${formattedTokenBalance}`}
      onChange={(_value) => {
        setAmount(_value);
        onAmountChange(_value);
      }}
      disabled={disabled}
      tokenSelector={
        <TokenSwitcher
          tokensList={tokensList}
          className="pl-0 bg-neutral-50"
          variant="small"
          selectedTokenIndex={selectedTokenIndex}
          onChange={(token) => {
            setToken(token);
            onTokenChange(token);
          }}
        />
      }
    />
  );
};
