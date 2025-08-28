import type { TradingButtonProps } from './types'

const TradingButton = ({ type, onClick, className = '' }: TradingButtonProps) => {
  const isBuy = type === 'buy'
  const buttonClass = isBuy ? 'buy-btn' : 'sell-btn'
  const label = isBuy ? 'Купить' : 'Продать'
  
  const iconPath = isBuy 
    ? "M8 0L16 8H12V16H4V8H0L8 0Z"  // Стрелка вверх
    : "M8 16L0 8H4V0H12V8H16L8 16Z" // Стрелка вниз

  return (
    <div 
      className={`trading-main-btn ${buttonClass} ${className}`} 
      onClick={onClick}
    >
      <div className="btn-content">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d={iconPath}/>
        </svg>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default TradingButton
