import { useState } from 'react'
import { Link } from 'react-router-dom'
import TransactionRow from '../Components/TransactionRow'
import { useTransactions } from '../context/transactions-context'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants'

const ALL_CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])].sort()

const categoriesForType = (type) => {
  if (type === 'income') return INCOME_CATEGORIES
  if (type === 'expense') return EXPENSE_CATEGORIES
  return ALL_CATEGORIES
}

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions()

  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')

  const categoryOptions = categoriesForType(typeFilter)

  const handleTypeFilter = (nextType) => {
    setTypeFilter(nextType)
    if (categoryFilter !== 'all' && !categoriesForType(nextType).includes(categoryFilter)) {
      setCategoryFilter('all')
    }
  }

  let visible = [...transactions]

  if (typeFilter !== 'all') {
    visible = visible.filter((t) => t.type === typeFilter)
  }
  if (categoryFilter !== 'all') {
    visible = visible.filter((t) => t.category === categoryFilter)
  }

  visible.sort((a, b) => {
    if (sortBy === 'date-asc') return (a.date || '').localeCompare(b.date || '')
    if (sortBy === 'amount-desc') return Number(b.amount) - Number(a.amount)
    if (sortBy === 'amount-asc') return Number(a.amount) - Number(b.amount)
    return (b.date || '').localeCompare(a.date || '')
  })

  return (
    <>
      <div className="my-5 px-5" id="all_transactions">
        <div className="d-flex justify-content-between align-items-center">
          <h2>All Transactions</h2>
          <Link to={'/add'} className="btn btn-dark btn-sm">+ Add Transaction</Link>
        </div>
        <hr />

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label small text-muted">Type</label>
            <select className="form-select" value={typeFilter} onChange={(e) => handleTypeFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label small text-muted">Category</label>
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All</option>
              {
                categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))
              }
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label small text-muted">Sort by</label>
            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date-desc">Date (newest)</option>
              <option value="date-asc">Date (oldest)</option>
              <option value="amount-desc">Amount (high to low)</option>
              <option value="amount-asc">Amount (low to high)</option>
            </select>
          </div>
        </div>

        {
          transactions.length === 0 ? (
            <div className="empty-state">
              <p>The ledger is empty.</p>
              <Link to={'/add'} className="btn btn-dark btn-sm">Add your first entry</Link>
            </div>
          ) : visible.length === 0 ? (
            <div className="empty-state">
              <p>No entries match your filters.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle bg-white shadow-sm rounded">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    visible.map((item) => (
                      <TransactionRow key={item.id} data={item} onDelete={deleteTransaction} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Transactions
