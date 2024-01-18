import { Dispatch, SetStateAction, createContext } from 'react'

export const IsTransactionInProgress = createContext<{
  isTransactionInProgress: boolean
  setIsTransactionInProgress: Dispatch<SetStateAction<boolean>>
}>({
  isTransactionInProgress: false,
  setIsTransactionInProgress: () => {},
})
