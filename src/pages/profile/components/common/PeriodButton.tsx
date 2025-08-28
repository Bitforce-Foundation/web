import type { PeriodButtonProps } from './types'

const PeriodButton = ({ 
  period, 
  label, 
  isActive, 
  onClick, 
  className = '' 
}: PeriodButtonProps) => {
  const handleClick = () => {
    onClick(period)
  }

  return (
    <button
      type="button"
      className={`period-button ${isActive ? 'period-button--active' : ''} ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

export default PeriodButton
