import { getFuncParams } from '@/src/utils/common'
import { Hex, decodeFunctionData, parseAbi } from 'viem'

export const getCalldataFunctionDetails = async (
  funcHash: string,
  callData: Hex,
): Promise<{ name: string; params: string[]; args: string[] } | null> => {
  const returnAbi = await fetch(
    `https://api.openchain.xyz/signature-database/v1/lookup?filter=true&function=${funcHash}`,
    { cache: 'no-store' },
  ).then((res) => res.json())
  if (returnAbi.result.function[funcHash]) {
    const funcName = returnAbi.result.function[funcHash][0].name
    const params = getFuncParams(funcName)

    const data: { args: string[] } = decodeFunctionData({
      abi: parseAbi([`function ${funcName}` as string]),
      data: callData,
    })

    return {
      name: funcName,
      params,
      args: data.args,
    }
  }

  return null
}
