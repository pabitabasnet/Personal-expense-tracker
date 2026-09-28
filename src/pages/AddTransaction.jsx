import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useTransactions } from '../context/transactions-context'
import { categoriesFor } from '../constants'

const todayISO = () => new Date().toISOString().slice(0, 10)

const createTransactionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

const AddTransaction = () => {
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()

  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categoriesFor('expense')[0])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayISO())

  const handleTypeChange = (nextType) => {
    setType(nextType)
    setCategory(categoriesFor(nextType)[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      Swal.fire({
        title: 'Invalid amount',
        text: 'Enter an amount greater than zero.',
        icon: 'error',
      })
      return
    }

    if (!description.trim()) {
      Swal.fire({
        title: 'Missing description',
        text: 'Add a short description for this entry.',
        icon: 'error',
      })
      return
    }

    const parsedDate = new Date(`${date}T00:00:00`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsedDate.getTime())) {
      Swal.fire({
        title: 'Invalid date',
        text: 'Choose a valid date for this entry.',
        icon: 'error',
      })
      return
    }

    addTransaction({
      id: createTransactionId(),
      type,
      amount: numericAmount,
      category,
      description: description.trim(),
      date,
    })

    Swal.fire({
      title: 'Added!',
      text: 'Transaction saved successfully.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/transactions')
    })
  }

  return (
    <>
      <div className="my-5 px-5" id="add_transaction">
        <h2>Add Transaction</h2>
        <hr />

        <form className="card shadow-sm p-4" style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>

          <div className="btn-group mb-3" role="group">
            <button
              type="button"
              className={`btn ${type === 'income' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`btn ${type === 'expense' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {
                categoriesFor(type).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))
              }
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Groceries at the market"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark">Save Transaction</button>
        </form>
      </div>
    </>
  )
}

export default AddTransaction
