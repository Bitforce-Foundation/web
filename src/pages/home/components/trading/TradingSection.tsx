import TradingCard from './TradingCard'
import type { TradingSectionProps } from './types'
import './TradingSection.css'

const TradingSection = ({ className = '' }: TradingSectionProps) => {
  return (
    <section id="services" className={`trading-section ${className}`}>
      <div className="trading-container">
        <TradingCard 
          title="Проприетарный трейдинг"
          description="Скоро"
        />
      </div>
    </section>
  )
}

export default TradingSection
