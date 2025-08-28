import { useState, useCallback, useMemo } from 'react'
import type { TransactionRecord, TransactionFilter } from '../Types'

interface UseTransactionHistoryReturn {
  transactions: TransactionRecord[]
  filteredTransactions: TransactionRecord[]
  filter: TransactionFilter
  isLoading: boolean
  hasMore: boolean
  updateFilter: (field: keyof TransactionFilter, value: string | number | { from: string; to: string }) => void
  resetFilter: () => void
  loadMore: () => Promise<void>
  refreshTransactions: () => Promise<void>
}

/**
 * Хук для управления историей транзакций
 * Следует принципу Single Responsibility - отвечает только за логику истории транзакций
 */
export const useTransactionHistory = (
  initialTransactions: TransactionRecord[] = []
): UseTransactionHistoryReturn => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(initialTransactions)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  const [filter, setFilter] = useState<TransactionFilter>({
    dateRange: {
      from: '',
      to: ''
    },
    transactionType: 'all',
    status: 'all',
    currency: 'all'
  })

  // Фильтрация транзакций
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Фильтр по типу
      if (filter.transactionType !== 'all' && transaction.type !== filter.transactionType) {
        return false
      }

      // Фильтр по статусу
      if (filter.status !== 'all' && transaction.status !== filter.status) {
        return false
      }

      // Фильтр по валюте
      if (filter.currency !== 'all' && transaction.currency !== filter.currency) {
        return false
      }

      // Фильтр по дате
      if (filter.dateRange.from) {
        const transactionDate = new Date(transaction.date)
        const fromDate = new Date(filter.dateRange.from)
        if (transactionDate < fromDate) {
          return false
        }
      }

      if (filter.dateRange.to) {
        const transactionDate = new Date(transaction.date)
        const toDate = new Date(filter.dateRange.to)
        if (transactionDate > toDate) {
          return false
        }
      }

      // Фильтр по сумме
      if (filter.minAmount !== undefined && transaction.amount < filter.minAmount) {
        return false
      }

      if (filter.maxAmount !== undefined && transaction.amount > filter.maxAmount) {
        return false
      }

      return true
    })
  }, [transactions, filter])

  // Обновление фильтра
  const updateFilter = useCallback((field: keyof TransactionFilter, value: string | number | { from: string; to: string }) => {
    setFilter(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  // Сброс фильтра
  const resetFilter = useCallback(() => {
    setFilter({
      dateRange: {
        from: '',
        to: ''
      },
      transactionType: 'all',
      status: 'all',
      currency: 'all'
    })
  }, [])

  // Загрузка дополнительных транзакций
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    try {
      setIsLoading(true)
      
      // Симуляция API запроса для загрузки дополнительных данных
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // В реальном приложении здесь будет API запрос
      // const newTransactions = await api.getTransactions({ offset: transactions.length })
      
      // Для демонстрации просто помечаем, что больше данных нет
      setHasMore(false)

    } catch (error) {
      console.error('Failed to load more transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore])

  // Обновление списка транзакций
  const refreshTransactions = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // В реальном приложении здесь будет API запрос
      // const refreshedTransactions = await api.getTransactions({ refresh: true })
      // setTransactions(refreshedTransactions)
      
      setHasMore(true)

    } catch (error) {
      console.error('Failed to refresh transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    transactions,
    filteredTransactions,
    filter,
    isLoading,
    hasMore,
    updateFilter,
    resetFilter,
    loadMore,
    refreshTransactions
  }
}
