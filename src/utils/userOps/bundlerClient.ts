import { createClient, http } from 'viem'
import { bundlerActions } from 'permissionless'
import { Network } from '@/src/domains/Network'
import { pimlicoBundlerActions } from 'permissionless/actions/pimlico'

export const getBundlerClient = (network: Network) =>
  createClient({
    transport: http(network.bundlerUrl),
    chain: network,
  })
    .extend(bundlerActions)
    .extend(pimlicoBundlerActions)
