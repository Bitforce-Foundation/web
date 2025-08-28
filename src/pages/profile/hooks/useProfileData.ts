import { useState, useEffect, useCallback } from 'react'
import type { 
  UseProfileData, 
  UserProfile, 
  SecuritySettings,
  ConversionData,
  ConversionStats,
  TransactionRecord 
} from '../Types'
import {
  mockUserProfile,
  mockSecuritySettings,
  mockConversionHistory,
  mockConversionStats,
  mockTransactionHistory
} from '../Data'

/**
 * Хук для управления данными профиля
 * Следует принципу Single Responsibility - отвечает только за данные
 * В реальном приложении здесь будут API вызовы
 */
export const useProfileData = (): UseProfileData => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null)
  const [conversionHistory, setConversionHistory] = useState<ConversionData[]>([])
  const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null)
  const [transactionHistory, setTransactionHistory] = useState<TransactionRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Симуляция API запросов
      await new Promise(resolve => setTimeout(resolve, 1000))

      // В реальном приложении здесь будут настоящие API вызовы
      setUserProfile(mockUserProfile)
      setSecuritySettings(mockSecuritySettings)
      setConversionHistory(mockConversionHistory)
      setConversionStats(mockConversionStats.month) // По умолчанию месяц
      setTransactionHistory(mockTransactionHistory)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    userProfile,
    securitySettings,
    conversionHistory,
    conversionStats,
    transactionHistory,
    isLoading,
    error,
    refetch
  }
}
