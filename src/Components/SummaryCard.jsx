import { formatCurrency } from '../constants'

const SummaryCard = (props) => {
  return (
    <div className="col">
      <div className={`card summary-card shadow-sm bg-${props.tone}-subtle`}>
        <div className="card-body">
          <p className="text-muted mb-1 small">{props.label}</p>
          <p className={`value text-${props.tone}-emphasis mb-0`}>
            {formatCurrency(props.value)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
