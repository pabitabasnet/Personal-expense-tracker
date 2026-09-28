import { createContext, useContext } from 'react'

export const TransactionsContext = createContext(null)

export const useTransactions = () => {
  const value = useContext(TransactionsContext)

  if (!value) {
    throw new Error('useTransactions must be used within TransactionsProvider')
  }

  return value
}
