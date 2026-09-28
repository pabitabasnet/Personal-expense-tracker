export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Entertainment',
  'Health',
  'Shopping',
  'Other',
]

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Gift', 'Interest', 'Other']

export function categoriesFor(type) {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

export function formatCurrency(amount) {
  const sign = amount < 0 ? '-' : ''
  return `${sign}Rs.${Math.abs(amount).toFixed(2)}`
}

export function formatDate(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
