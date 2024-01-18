import { Dispatch, SetStateAction, createContext } from 'react'

export const IsUserOpInProgressContext = createContext<{
  isUserOpInProgress: boolean
  setIsUserOpInProgress: Dispatch<SetStateAction<boolean>>
}>({
  isUserOpInProgress: false,
  setIsUserOpInProgress: () => {},
})
