import { useState, useCallback } from 'react'
import './ConversionForm.css'
import { Card, LoadingSpinner } from '../../common'

const currencies = [
  { code: 'USD', name: 'Доллар США' },
  { code: 'EUR', name: 'Евро' },
  { code: 'RUB', name: 'Российский рубль' },
  { code: 'BTC', name: 'Bitcoin' },
  { code: 'ETH', name: 'Ethereum' }
]

const ConversionForm = ({ className = '' }: { className?: string }) => {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(0.85)
  const [convertedAmount, setConvertedAmount] = useState('')

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value)
    if (value && !isNaN(Number(value))) {
      const converted = (Number(value) * exchangeRate).toFixed(2)
      setConvertedAmount(converted)
    } else {
      setConvertedAmount('')
    }
  }, [exchangeRate])

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setExchangeRate(1 / exchangeRate)
    if (convertedAmount) {
      setAmount(convertedAmount)
      setConvertedAmount(amount)
    }
  }, [fromCurrency, toCurrency, exchangeRate, amount, convertedAmount])

  const handleSubmit = useCallback(async () => {
    if (!amount || isNaN(Number(amount))) return
    
    setIsLoading(true)
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    // Очистка формы после успешной конвертации
    setAmount('')
    setConvertedAmount('')
  }, [amount])

  const isFormValid = amount && !isNaN(Number(amount)) && Number(amount) > 0

  return (
    <Card className={`conversion-form ${className}`}>
      <div className="conversion-form__content">
        {/* From Currency */}
        <div className="conversion-form__field">
          <label className="conversion-form__label">Из валюты</label>
          <div className="conversion-form__currency-input">
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="conversion-form__currency-select"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="conversion-form__amount-input"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="conversion-form__swap">
          <button 
            type="button"
            onClick={handleSwapCurrencies}
            className="conversion-form__swap-btn"
            aria-label="Поменять валюты местами"
          >
            <span className="material-icons">swap_vert</span>
          </button>
        </div>

        {/* To Currency */}
        <div className="conversion-form__field">
          <label className="conversion-form__label">В валюту</label>
          <div className="conversion-form__currency-input">
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="conversion-form__currency-select"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={convertedAmount}
              readOnly
              placeholder="0.00"
              className="conversion-form__amount-input conversion-form__amount-input--readonly"
            />
          </div>
        </div>

        {/* Exchange Rate */}
        {amount && (
          <div className="conversion-form__rate">
            <span className="conversion-form__rate-text">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className="conversion-form__submit-btn"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Конвертация...
            </>
          ) : (
            <>
              <span className="material-icons">currency_exchange</span>
              Конвертировать
            </>
          )}
        </button>
      </div>
    </Card>
  )
}

export default ConversionForm
