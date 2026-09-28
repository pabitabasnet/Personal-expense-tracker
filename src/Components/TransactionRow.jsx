import Swal from 'sweetalert2'
import { formatCurrency, formatDate } from '../constants'

const TransactionRow = (props) => {
  const item = props.data
  const isIncome = item.type === 'income'

  const confirmDelete = () => {
    Swal.fire({
      title: 'Delete this entry?',
      text: item.description,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDelete(item.id)
      }
    })
  }

  return (
    <tr className='txn-row'>
      <td>{formatDate(item.date)}</td>
      <td>
        {item.description}
        <br />
        <span className='text-muted small'>{item.category}</span>
      </td>
      <td className={isIncome ? 'text-success fw-bold' : 'text-danger fw-bold'}>
        {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
      </td>
      <td className='text-end'>
        <button className='btn btn-sm btn-outline-danger' onClick={confirmDelete}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TransactionRow
