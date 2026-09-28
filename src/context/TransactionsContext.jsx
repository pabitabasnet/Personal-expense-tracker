import { useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { TransactionsContext } from './transactions-context'

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('expense-tracker:transactions', [])

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction])
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        const amount = Number(t.amount) || 0
        if (t.type === 'income') acc.totalIncome += amount
        else acc.totalExpense += amount
        return acc
      },
      { totalIncome: 0, totalExpense: 0 },
    )
  }, [transactions])

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome: totals.totalIncome,
    totalExpense: totals.totalExpense,
    balance: totals.totalIncome - totals.totalExpense,
  }

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}
