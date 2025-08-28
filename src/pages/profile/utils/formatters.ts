/**
 * Утилиты для форматирования данных профиля
 * Следует принципу Single Responsibility - каждая функция имеет одну ответственность
 */

/**
 * Форматирует дату в читаемый формат
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString)
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return date.toLocaleDateString('ru-RU', { ...defaultOptions, ...options })
}

/**
 * Форматирует дату в относительный формат (например, "2 часа назад")
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    год: 31536000,
    месяц: 2592000,
    неделя: 604800,
    день: 86400,
    час: 3600,
    минута: 60
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return `${interval} ${getPlural(interval, unit)} назад`
    }
  }

  return 'только что'
}

/**
 * Получает правильную форму множественного числа для русского языка
 */
const getPlural = (count: number, word: string): string => {
  const pluralRules: Record<string, [string, string, string]> = {
    год: ['год', 'года', 'лет'],
    месяц: ['месяц', 'месяца', 'месяцев'],
    неделя: ['неделю', 'недели', 'недель'],
    день: ['день', 'дня', 'дней'],
    час: ['час', 'часа', 'часов'],
    минута: ['минуту', 'минуты', 'минут']
  }

  const forms = pluralRules[word]
  if (!forms) return word

  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms[2]
  }

  if (lastDigit === 1) {
    return forms[0]
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }

  return forms[2]
}

/**
 * Форматирует сумму в читаемый формат
 */
export const formatAmount = (
  amount: number, 
  currency: string, 
  options?: Intl.NumberFormatOptions
): string => {
  const cryptoCurrencies = ['BTC', 'ETH', 'USDT']
  
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: cryptoCurrencies.includes(currency) ? 4 : 2,
    maximumFractionDigits: cryptoCurrencies.includes(currency) ? 8 : 2
  }

  const formattedAmount = amount.toLocaleString('ru-RU', { ...defaultOptions, ...options })
  
  return `${formattedAmount} ${currency}`
}

/**
 * Форматирует процент
 */
export const formatPercentage = (value: number, precision: number = 2): string => {
  return `${value.toFixed(precision)}%`
}

/**
 * Форматирует курс обмена
 */
export const formatExchangeRate = (
  rate: number, 
  fromCurrency: string, 
  toCurrency: string,
  precision: number = 4
): string => {
  return `1 ${fromCurrency} = ${rate.toFixed(precision)} ${toCurrency}`
}

/**
 * Сокращает длинные строки с многоточием
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Форматирует хеш транзакции для отображения
 */
export const formatTransactionHash = (hash: string, startChars: number = 6, endChars: number = 4): string => {
  if (hash.length <= startChars + endChars) return hash
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`
}

/**
 * Форматирует номер телефона
 */
export const formatPhoneNumber = (phone: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = phone.replace(/\D/g, '')
  
  // Если номер начинается с 8, заменяем на 7
  const normalized = cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned
  
  // Форматируем как +7 (XXX) XXX-XX-XX
  if (normalized.length === 11 && normalized.startsWith('7')) {
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`
  }
  
  return phone // Возвращаем исходный формат если не удалось распознать
}
