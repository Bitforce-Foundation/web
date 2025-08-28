export interface TradingSectionProps {
  className?: string
}

export interface TradingCardProps {
  title: string
  description: string
  className?: string
}

export interface TradingButtonsProps {
  onBuyClick?: () => void
  onSellClick?: () => void
  className?: string
}

export interface TradingButtonProps {
  type: 'buy' | 'sell'
  onClick?: () => void
  className?: string
}
