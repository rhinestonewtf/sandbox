import { getGasPrice } from "@wagmi/core";
import { Network } from "@/src/domains/Network";
import { useQuery } from "@tanstack/react-query";
import { wagmiConfig } from "@/src/app/(app)/Providers";
import { useActiveNetwork } from "@/src/domains/Network/hooks";

type Params = {
  network: Network;
};

export async function getFeeData({ network }: Params): Promise<Number> {
  const price = await getGasPrice(wagmiConfig, {
    chainId: network.id as any,
  });

  return Number(price) / 10 ** 9;
}

export const useGetFeeData = () => {
  const [activeNetwork] = useActiveNetwork();

  return useQuery<Number, Error>({
    queryKey: ["feeData", activeNetwork.id],
    queryFn: () => getFeeData({ network: activeNetwork }),
  });
};
