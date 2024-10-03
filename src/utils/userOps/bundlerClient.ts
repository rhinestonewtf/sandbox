import { createClient, http } from "viem";
import { Network } from "@/src/domains/Network";
import { pimlicoBundlerActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07, bundlerActions } from "permissionless";

export const getBundlerClient = (network: Network) =>
  createClient({
    transport: http(network.bundlerUrl),
    chain: network,
  })
    .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
    .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));
