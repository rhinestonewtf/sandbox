import { Network } from '@/src/domains/Network'
import { useQuery } from '@tanstack/react-query'
import { FetchFeeDataResult, fetchFeeData } from '@wagmi/core'
import { useActiveNetwork } from '@/src/domains/Network/hooks'

type Params = {
  network: Network
}

export async function getFeeData({
  network,
}: Params): Promise<FetchFeeDataResult> {
  const feeData = await fetchFeeData({
    chainId: network.id,
    formatUnits: 'gwei',
  })
  return feeData
}

export const useGetFeeData = () => {
  const [activeNetwork] = useActiveNetwork()

  return useQuery<FetchFeeDataResult, Error>({
    queryKey: ['feeData', activeNetwork.id],
    queryFn: () => getFeeData({ network: activeNetwork }),
  })
}
