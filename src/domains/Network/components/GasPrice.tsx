"use client";

import { Button } from "@/src/ui-kit";
import { useGetFeeData } from "../api/getGasPrice";
import { formatAmount } from "../../Token/ERC20Token/helpers";

type Props = {
  className?: string;
};

export const GasPrice = ({ className }: Props) => {
  const { data: gasPrice, refetch: fetchFeeData, isLoading } = useGetFeeData();

  if (gasPrice)
    return (
      <Button
        onClick={fetchFeeData}
        isLoading={isLoading}
        className={`bg-background rounded-lg hover:bg-transparent ${className}`}
      >
        {formatAmount({
          amount: Number(gasPrice),
          decimals: 2,
        })}{" "}
        GWEI
      </Button>
    );

  return <></>;
};
