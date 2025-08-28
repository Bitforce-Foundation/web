import { useState, useCallback, useMemo } from 'react'
import type { ConversionFormData } from '../Types'

interface UseConversionFormReturn {
  formData: ConversionFormData
  isValid: boolean
  isLoading: boolean
  exchangeRate: number
  convertedAmount: string
  updateFormData: (field: keyof ConversionFormData, value: string) => void
  swapCurrencies: () => void
  submitConversion: () => Promise<void>
  resetForm: () => void
}

/**
 * Хук для управления формой конвертации
 * Следует принципу Single Responsibility - отвечает только за логику формы конвертации
 */
export const useConversionForm = (): UseConversionFormReturn => {
  const [formData, setFormData] = useState<ConversionFormData>({
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(0.85)

  // Валидация формы
  const isValid = useMemo(() => {
    return (
      formData.amount.trim() !== '' &&
      !isNaN(Number(formData.amount)) &&
      Number(formData.amount) > 0 &&
      formData.fromCurrency !== formData.toCurrency
    )
  }, [formData])

  // Расчет конвертированной суммы
  const convertedAmount = useMemo(() => {
    if (!formData.amount || isNaN(Number(formData.amount))) {
      return ''
    }
    return (Number(formData.amount) * exchangeRate).toFixed(2)
  }, [formData.amount, exchangeRate])

  // Обновление данных формы
  const updateFormData = useCallback((field: keyof ConversionFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Если меняется валюта, обновляем курс (в реальном приложении - API запрос)
    if (field === 'fromCurrency' || field === 'toCurrency') {
      // Симуляция получения курса обмена
      const mockRates: Record<string, number> = {
        'USD-EUR': 0.85,
        'EUR-USD': 1.18,
        'USD-RUB': 75.5,
        'RUB-USD': 0.013,
        'BTC-USD': 45000,
        'USD-BTC': 0.000022,
        'ETH-USD': 2500,
        'USD-ETH': 0.0004
      }

      const updatedData = { ...formData, [field]: value }
      const rateKey = `${updatedData.fromCurrency}-${updatedData.toCurrency}`
      setExchangeRate(mockRates[rateKey] || 1)
    }
  }, [formData])

  // Обмен валют местами
  const swapCurrencies = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency
    }))
    setExchangeRate(prev => 1 / prev)
  }, [])

  // Отправка формы конвертации
  const submitConversion = useCallback(async () => {
    if (!isValid) return

    try {
      setIsLoading(true)
      
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // В реальном приложении здесь будет отправка на сервер
      console.log('Conversion submitted:', {
        ...formData,
        exchangeRate,
        convertedAmount: Number(convertedAmount)
      })

      // Сброс формы после успешной конвертации
      setFormData({
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: ''
      })

    } catch (error) {
      console.error('Conversion failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [formData, isValid, exchangeRate, convertedAmount])

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormData({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: ''
    })
    setExchangeRate(0.85)
  }, [])

  return {
    formData,
    isValid,
    isLoading,
    exchangeRate,
    convertedAmount,
    updateFormData,
    swapCurrencies,
    submitConversion,
    resetForm
  }
}
