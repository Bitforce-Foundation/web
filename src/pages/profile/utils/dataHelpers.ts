import type { TransactionRecord, ConversionData } from '../Types'

/**
 * Утилиты для работы с данными профиля
 * Следует принципу Single Responsibility - каждая функция выполняет одну задачу
 */

/**
 * Сортирует транзакции по дате (новые первыми)
 */
export const sortTransactionsByDate = (transactions: TransactionRecord[]): TransactionRecord[] => {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Группирует транзакции по дате
 */
export const groupTransactionsByDate = (transactions: TransactionRecord[]): Record<string, TransactionRecord[]> => {
  const grouped: Record<string, TransactionRecord[]> = {}

  transactions.forEach(transaction => {
    const date = new Date(transaction.date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(transaction)
  })

  return grouped
}

/**
 * Вычисляет общую статистику по транзакциям
 */
export const calculateTransactionStats = (transactions: TransactionRecord[]) => {
  const stats = {
    total: transactions.length,
    completed: 0,
    pending: 0,
    failed: 0,
    cancelled: 0,
    totalVolume: 0,
    totalFees: 0,
    currencies: new Set<string>(),
    types: new Set<string>()
  }

  transactions.forEach(transaction => {
    switch (transaction.status) {
      case 'completed':
        stats.completed++
        break
      case 'pending':
        stats.pending++
        break
      case 'failed':
        stats.failed++
        break
      case 'cancelled':
        stats.cancelled++
        break
    }
    stats.totalVolume += transaction.amount
    stats.totalFees += transaction.fee || 0
    stats.currencies.add(transaction.currency)
    stats.types.add(transaction.type)
  })

  return {
    ...stats,
    currencies: Array.from(stats.currencies),
    types: Array.from(stats.types)
  }
}

/**
 * Фильтрует транзакции по периоду
 */
export const filterTransactionsByPeriod = (
  transactions: TransactionRecord[],
  period: 'day' | 'week' | 'month' | 'quarter' | 'year'
): TransactionRecord[] => {
  const now = new Date()
  const periodStart = new Date()

  switch (period) {
    case 'day':
      periodStart.setDate(now.getDate() - 1)
      break
    case 'week':
      periodStart.setDate(now.getDate() - 7)
      break
    case 'month':
      periodStart.setMonth(now.getMonth() - 1)
      break
    case 'quarter':
      periodStart.setMonth(now.getMonth() - 3)
      break
    case 'year':
      periodStart.setFullYear(now.getFullYear() - 1)
      break
  }

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= periodStart && transactionDate <= now
  })
}

/**
 * Находит популярные валютные пары в конвертациях
 */
export const findPopularCurrencyPairs = (conversions: ConversionData[], limit: number = 5) => {
  const pairCounts: Record<string, { count: number; volume: number }> = {}

  conversions.forEach(conversion => {
    const pair = `${conversion.fromCurrency}/${conversion.toCurrency}`
    
    if (!pairCounts[pair]) {
      pairCounts[pair] = { count: 0, volume: 0 }
    }
    
    pairCounts[pair].count++
    pairCounts[pair].volume += conversion.fromAmount
  })

  return Object.entries(pairCounts)
    .map(([pair, data]) => ({ pair, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

/**
 * Вычисляет среднюю сумму транзакций
 */
export const calculateAverageAmount = (transactions: TransactionRecord[]): number => {
  if (transactions.length === 0) return 0
  
  const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  return total / transactions.length
}

/**
 * Группирует транзакции по валютам
 */
export const groupTransactionsByCurrency = (transactions: TransactionRecord[]): Record<string, TransactionRecord[]> => {
  const grouped: Record<string, TransactionRecord[]> = {}

  transactions.forEach(transaction => {
    if (!grouped[transaction.currency]) {
      grouped[transaction.currency] = []
    }
    grouped[transaction.currency].push(transaction)
  })

  return grouped
}

/**
 * Находит самую активную валюту
 */
export const findMostActiveCurrency = (transactions: TransactionRecord[]): string | null => {
  const currencyStats = groupTransactionsByCurrency(transactions)
  
  let mostActiveCurrency = null
  let maxTransactions = 0

  Object.entries(currencyStats).forEach(([currency, currencyTransactions]) => {
    if (currencyTransactions.length > maxTransactions) {
      maxTransactions = currencyTransactions.length
      mostActiveCurrency = currency
    }
  })

  return mostActiveCurrency
}

/**
 * Проверяет наличие подозрительной активности
 */
export const detectSuspiciousActivity = (transactions: TransactionRecord[]): {
  hasSuspiciousActivity: boolean
  reasons: string[]
} => {
  const reasons: string[] = []
  const now = new Date()
  const lastHour = new Date(now.getTime() - 60 * 60 * 1000)

  // Проверка на частые транзакции
  const recentTransactions = transactions.filter(t => new Date(t.date) > lastHour)
  if (recentTransactions.length > 10) {
    reasons.push('Слишком много транзакций за последний час')
  }

  // Проверка на крупные суммы
  const largeTransactions = transactions.filter(t => t.amount > 100000)
  if (largeTransactions.length > 0) {
    reasons.push('Обнаружены транзакции с крупными суммами')
  }

  // Проверка на множественные неудачные попытки
  const failedTransactions = transactions.filter(t => t.status === 'failed')
  if (failedTransactions.length > 5) {
    reasons.push('Множественные неудачные транзакции')
  }

  return {
    hasSuspiciousActivity: reasons.length > 0,
    reasons
  }
}

/**
 * Экспортирует транзакции в CSV формат
 */
export const exportTransactionsToCSV = (transactions: TransactionRecord[]): string => {
  const headers = ['ID', 'Дата', 'Тип', 'Сумма', 'Валюта', 'Статус', 'Описание', 'Комиссия']
  const csvData = [headers.join(',')]

  transactions.forEach(transaction => {
    const row = [
      transaction.id,
      transaction.date,
      transaction.type,
      transaction.amount.toString(),
      transaction.currency,
      transaction.status,
      `"${transaction.description}"`, // Заключаем в кавычки на случай запятых
      (transaction.fee || 0).toString()
    ]
    csvData.push(row.join(','))
  })

  return csvData.join('\n')
}

/**
 * Генерирует уникальный ID для новой транзакции
 */
export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `tx_${timestamp}_${randomStr}`
}
