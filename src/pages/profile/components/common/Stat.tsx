import type { StatProps } from './types'

const Stat = ({ 
  label, 
  value, 
  trend = 'neutral', 
  icon, 
  className = '' 
}: StatProps) => {
  const trendClass = {
    positive: 'stat--positive',
    negative: 'stat--negative',
    neutral: 'stat--neutral'
  }[trend]

  return (
    <div className={`stat ${trendClass} ${className}`}>
      {icon && (
        <div className="stat__icon">
          <span className="material-icons">{icon}</span>
        </div>
      )}
      <div className="stat__content">
        <div className="stat__value">{value}</div>
        <div className="stat__label">{label}</div>
      </div>
    </div>
  )
}

export default Stat
