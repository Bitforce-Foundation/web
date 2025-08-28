import type { TradingCardProps } from './types'

const TradingCard = ({ title, description, className = '' }: TradingCardProps) => {
  return (
    <div className={`coming-soon-card ${className}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default TradingCard
