import { ReactNode } from 'react'
import { Address, Hex } from 'viem'
import { UserOperation } from 'permissionless'

export type ExecuteAction = {
  target: Address
  value: BigInt
  callData: Hex
}

export type TransactionDetailsForUserOp = {
  actions: ExecuteAction[]
  gasLimit?: BigInt
  maxFeePerGas?: BigInt
  maxPriorityFeePerGas?: BigInt
}

export type UserOperationStruct = UserOperation & {
  value?: string
  to: string
  input: Address
  blockTime: string
  date: string
  time: string
  actualGasCost: string
  actualGasUsed: string
  funcHash: string
  data: Hex
  success: boolean
  transactionHash: string
}

export type UserOperationActivityDetails = {
  value: number
  to: string
  data: Hex
  funcHash: string
  title: string
  isContractInteraction: boolean
}

export type UserOperationActivityStruct = UserOperation & {
  details: UserOperationActivityDetails[]
  title: string
  input: Address
  blockTime: string
  date: string
  time: string
  actualGasCost: string
  success: boolean
  transactionHash: string
  symbol: string
  value: string[]
}

export type PendingUserOperation = {
  signedOp: UserOperation
  name: string
  hash: Hex
  icon?: ReactNode
  callback?: () => void
}
