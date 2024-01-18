import { Address } from 'viem'
import { Account } from '../Account'
import { Network } from '../../Network'
import { getPublicClient } from '../../Network/helpers'
import AccountInterface from '@/src/constants/abis/Account.json'
import { getInitializationDataFromInitcode } from './createAccount'

export async function isValidatorInstalled(
  network: Network,
  account: Account,
  validator: Address,
): Promise<boolean> {
  let isModuleInstalled = false

  if (account.deployedOnNetworks.includes(network.id)) {
    const publicClient = getPublicClient(network)

    isModuleInstalled = (await publicClient.readContract({
      address: account.address,
      abi: AccountInterface.abi,
      functionName: 'isValidatorInstalled',
      args: [validator],
    })) as boolean
  } else {
    const { initialValidators } = getInitializationDataFromInitcode(
      account.initCode,
    )
    isModuleInstalled = initialValidators.some(
      (validatorModule) => validatorModule.module === validator,
    )
  }
  return isModuleInstalled
}

export async function isExecutorInstalled(
  network: Network,
  account: Account,
  executor: Address,
): Promise<boolean> {
  let isModuleInstalled = false

  if (account.deployedOnNetworks.includes(network.id)) {
    const publicClient = getPublicClient(network)

    isModuleInstalled = (await publicClient.readContract({
      address: account.address,
      abi: AccountInterface.abi,
      functionName: 'isExecutorInstalled',
      args: [executor],
    })) as boolean
  } else {
    const { initialExecutors } = getInitializationDataFromInitcode(
      account.initCode,
    )
    isModuleInstalled = initialExecutors.some(
      (executorModule) => executorModule.module === executor,
    )
  }
  return isModuleInstalled
}

export async function isFallbackInstalled(
  network: Network,
  account: Account,
  fallbackHandler: Address,
): Promise<boolean> {
  let isModuleInstalled = false

  if (account.deployedOnNetworks.includes(network.id)) {
    const publicClient = getPublicClient(network)

    isModuleInstalled = (await publicClient.readContract({
      address: account.address,
      abi: AccountInterface.abi,
      functionName: 'isFallbackInstalled',
      args: [fallbackHandler],
    })) as boolean
  } else {
    const { initialFallback } = getInitializationDataFromInitcode(
      account.initCode,
    )
    isModuleInstalled = initialFallback.module === fallbackHandler
  }
  return isModuleInstalled
}

export async function isHookInstalled(
  network: Network,
  account: Account,
  hook: Address,
): Promise<boolean> {
  let isModuleInstalled = true

  if (account.deployedOnNetworks.includes(network.id)) {
    const publicClient = getPublicClient(network)

    isModuleInstalled = (await publicClient.readContract({
      address: account.address,
      abi: AccountInterface.abi,
      functionName: 'isHookInstalled',
      args: [hook],
    })) as boolean
  } else {
    const { initialHook } = getInitializationDataFromInitcode(account.initCode)
    isModuleInstalled = initialHook.module === hook
  }
  return isModuleInstalled
}
