import { formatCurrency } from '../constants'

const CategoryBreakdown = (props) => {
  const expenses = props.transactions.filter((t) => t.type === 'expense')

  if (expenses.length === 0) {
    return null
  }

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + (Number(t.amount) || 0)
    return acc
  }, {})

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1])
  const maxValue = entries[0][1] || 1

  return (
    <div className='card shadow-sm mt-4'>
      <div className='card-body'>
        <h5 className='card-title mb-3'>Spending by Category</h5>
        {
          entries.map(([category, total]) => (
            <div className='row align-items-center mb-2' key={category}>
              <div className='col-3 small'>{category}</div>
              <div className='col-6'>
                <div className='category-bar-track'>
                  <div
                    className='category-bar-fill'
                    style={{ width: `${(total / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className='col-3 text-end small'>{formatCurrency(total)}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryBreakdown
