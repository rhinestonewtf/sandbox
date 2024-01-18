"use client";

import { Button } from "@/src/ui-kit";
import { useGetFeeData } from "../api/getGasPrice";

type Props = {
  className?: string;
};

export const GasPrice = ({ className }: Props) => {
  const { data: feeData, refetch: fetchFeeData, isLoading } = useGetFeeData();

  if (feeData)
    return (
      <Button
        onClick={fetchFeeData}
        isLoading={isLoading}
        className={`bg-background rounded-lg shadow-none hover:bg-transparent ${className}`}
      >
        {feeData?.formatted.gasPrice?.slice(0, 3)} GWEI
      </Button>
    );

  return <></>;
};
