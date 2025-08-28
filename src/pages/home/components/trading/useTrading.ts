import { useCallback } from 'react'

export const useTrading = () => {
  const handleBuyClick = useCallback(() => {
    window.location.href = '/buy'
  }, [])

  const handleSellClick = useCallback(() => {
    window.location.href = '/sell'
  }, [])

  const handleActionChange = useCallback((action: string) => {
    if (action === 'buy') {
      handleBuyClick()
    } else if (action === 'sell') {
      handleSellClick()
    }
  }, [handleBuyClick, handleSellClick])

  return {
    handleBuyClick,
    handleSellClick,
    handleActionChange
  }
}
