import { Address, Hex, encodeAbiParameters } from 'viem'

export type FallbackParam = {
  selector: Hex
  fallbackType: BigInt
  handler: Address
}

const extensibleFallbackHandlerParamsAbi = [
  {
    components: [
      {
        name: 'selector',
        type: 'bytes4',
      },
      {
        name: 'fallbackType',
        type: 'uint8',
      },
      {
        name: 'handler',
        type: 'address',
      },
    ],
    name: 'Params',
    type: 'tuple[]',
  },
]

export function encodeFallbackParams(params: FallbackParam[]) {
  return encodeAbiParameters(extensibleFallbackHandlerParamsAbi, [params])
}
