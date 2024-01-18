import moment from 'moment'
import { Account } from '../../Account'
import { Network } from '../../Network'
import { decodeFunctionData } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { formatAddress } from '@/src/utils/common'
import { useActiveAccount } from '../../Account/hooks'
import { useActiveNetwork } from '../../Network/hooks'
import { JIFFY_SCAN_BASE_URL } from '@/src/constants/constants'
import AccountInterface from '@/src/constants/abis/Account.json'
import EntryPoint_ABI from '@/src/constants/abis/EntryPoint_ABI.json'
import {
  UserOperationActivityDetails,
  UserOperationActivityStruct,
} from '../UserOperation'

type Params = {
  activeAccount: Account
  activeNetwork: Network
}

export const getAddressActivity = async ({
  activeAccount,
  activeNetwork,
}: Params) => {
  const headers = { 'x-api-key': process.env.NEXT_PUBLIC_JIFFY_SCAN_API_KEY! }

  return await fetch(
    `${JIFFY_SCAN_BASE_URL}/getAddressActivity?address=${activeAccount.address}&network=${activeNetwork.queryName}`,
    {
      headers,
    },
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.accountDetail) {
        const mappedUserOps = data.accountDetail.userOps.map(
          (userOp: UserOperationActivityStruct) =>
            mapUserOp(userOp, activeNetwork),
        )
        return getGroupedUserOps(mappedUserOps)
      }

      return {}
    })
}

const mapUserOp = (
  userOp: UserOperationActivityStruct,
  activeNetwork: Network,
) => {
  let details: UserOperationActivityDetails[] = []
  let title = ''

  const callData = decodeFunctionData({
    abi: EntryPoint_ABI.abi,
    data: userOp.input,
  })

  if (callData.args?.length) {
    const arg = callData.args[0] as any
    if (arg.length) {
      const _data = decodeFunctionData({
        abi: AccountInterface.abi,
        data: arg[0].callData,
      }) as any

      if (_data.functionName == 'execute') {
        if (_data.args?.length) {
          const [_to, _value, calldata] = _data.args
          const hasData = calldata != '0x'

          let funcHash = hasData ? calldata.slice(0, 10) : ''
          let data = hasData ? calldata : ''
          let to = _to
          let value =
            Number(_value) / 10 ** activeNetwork.nativeCurrency.decimals

          title = hasData
            ? `Interacted with ${formatAddress(to)}`
            : `Sent to ${formatAddress(to)}`
          details.push({
            value,
            to,
            data,
            funcHash,
            title: title,
            isContractInteraction: !!hasData,
          })
        }
      } else if (_data.functionName == 'executeBatch') {
        if (_data.args?.length && _data.args[0]?.length) {
          title = 'Batch transaction'

          for (let i = 0; i < _data.args[0].length; i++) {
            const { target, value: _value, callData } = _data.args[0][i]
            const to = target
            const value =
              Number(_value) / 10 ** activeNetwork.nativeCurrency.decimals
            const hasData = callData != '0x'
            const funcHash = hasData ? callData.slice(0, 10) : ''
            const data = callData

            details.push({
              value,
              to,
              data,
              funcHash,
              title: hasData
                ? `Interacted with ${formatAddress(to)}`
                : `Sent to ${formatAddress(to)}`,
              isContractInteraction: !!hasData,
            })
          }
        } else {
          throw new Error('Unknown function name')
        }
      }
    }
  }

  userOp.details = details
  userOp.title = title
  userOp.date = moment.unix(Number(userOp.blockTime)).format('DD MMM')
  userOp.time = moment.unix(Number(userOp.blockTime)).format('HH:mm')
  userOp.symbol = activeNetwork.nativeCurrency.symbol

  return userOp
}

const getGroupedUserOps = (userOps: UserOperationActivityStruct[]) => {
  const groupedUserOps: Record<string, UserOperationActivityStruct[]> = {}
  userOps.forEach((userOp) => {
    if (!groupedUserOps[userOp.date]) {
      groupedUserOps[userOp.date] = []
    }
    groupedUserOps[userOp.date].push(userOp)
  })
  return groupedUserOps
}

export const useGetAccountActivity = () => {
  const [activeNetwork] = useActiveNetwork()
  const [activeAccount] = useActiveAccount()

  return useQuery<Record<string, UserOperationActivityStruct[]>, Error>({
    queryKey: ['activities', activeNetwork.id, activeAccount.address],
    queryFn: () => getAddressActivity({ activeAccount, activeNetwork }),
  })
}
