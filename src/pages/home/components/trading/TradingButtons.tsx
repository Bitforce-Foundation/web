import TradingButton from './TradingButton'
import { useTrading } from './useTrading'
import type { TradingButtonsProps } from './types'

const TradingButtons = ({ 
  onBuyClick, 
  onSellClick, 
  className = '' 
}: TradingButtonsProps) => {
  const { handleBuyClick, handleSellClick } = useTrading()

  const handleBuy = onBuyClick || handleBuyClick
  const handleSell = onSellClick || handleSellClick

  return (
    <section className={`trading-buttons-section ${className}`}>
      <div className="trading-buttons-container">
        <div className="trading-button-wrapper">
          <TradingButton 
            type="buy" 
            onClick={handleBuy}
          />
          <TradingButton 
            type="sell" 
            onClick={handleSell}
          />
        </div>
      </div>
    </section>
  )
}

export default TradingButtons
