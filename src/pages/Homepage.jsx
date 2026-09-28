import { Link } from 'react-router-dom'
import SummaryCard from '../Components/SummaryCard'
import CategoryBreakdown from '../Components/CategoryBreakdown'
import { useTransactions } from '../context/transactions-context'
import { formatCurrency, formatDate } from '../constants'

const Homepage = () => {
  const { transactions, balance, totalIncome, totalExpense } = useTransactions()

  const recent = [...transactions]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 5)

  return (
    <>
      <div className="my-5 px-5" id="dashboard">
        <h2>Dashboard</h2>
        <hr />

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          <SummaryCard label="Balance" value={balance} tone="primary" />
          <SummaryCard label="Total Income" value={totalIncome} tone="success" />
          <SummaryCard label="Total Expenses" value={totalExpense} tone="danger" />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Recent Transactions</h4>
          <Link to={'/transactions'} className="btn btn-sm btn-outline-secondary">
            View All
          </Link>
        </div>

        {
          recent.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet.</p>
              <Link to={'/add'} className="btn btn-dark btn-sm">Add your first entry</Link>
            </div>
          ) : (
            <ul className="list-group mb-4">
              {
                recent.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {item.description}
                      <br />
                      <span className="text-muted small">{formatDate(item.date)} &middot; {item.category}</span>
                    </div>
                    <span className={item.type === 'income' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                      {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                    </span>
                  </li>
                ))
              }
            </ul>
          )
        }

        <CategoryBreakdown transactions={transactions} />
      </div>
    </>
  )
}

export default Homepage
