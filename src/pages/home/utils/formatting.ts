import type { FormatOptions } from './types'

/**
 * Форматирует число с разделителями тысяч
 */
export const formatNumber = (
  num: number, 
  locale: string = 'ru-RU'
): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Форматирует валюту
 */
export const formatCurrency = (
  amount: number,
  options: FormatOptions = {}
): string => {
  const {
    locale = 'ru-RU',
    currency = 'RUB',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount)
}

/**
 * Форматирует дату
 */
export const formatDate = (
  date: Date | string,
  locale: string = 'ru-RU',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(dateObj)
}

/**
 * Форматирует время
 */
export const formatTime = (
  date: Date | string,
  locale: string = 'ru-RU',
  use24Hour: boolean = true
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24Hour
  }).format(dateObj)
}

/**
 * Форматирует процент
 */
export const formatPercent = (
  value: number,
  locale: string = 'ru-RU',
  decimals: number = 2
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100)
}

/**
 * Форматирует номер телефона
 */
export const formatPhoneNumber = (phone: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = phone.replace(/\D/g, '')
  
  // Если номер начинается с 8, заменяем на +7
  const normalized = cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned
  
  // Форматируем в вид +7 (XXX) XXX-XX-XX
  if (normalized.length === 11 && normalized.startsWith('7')) {
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`
  }
  
  return phone // Возвращаем исходный номер, если не удалось отформатировать
}

/**
 * Форматирует размер файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б'
  
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

/**
 * Сокращает текст до указанной длины
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Капитализирует первую букву строки
 */
export const capitalize = (text: string): string => {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Конвертирует строку в kebab-case
 */
export const toKebabCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
