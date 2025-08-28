import type { TransactionRecord, ConversionData } from '../Types'

/**
 * Утилиты для валидации данных профиля
 * Следует принципу Single Responsibility - каждая функция проверяет одно условие
 */

/**
 * Проверяет валидность email адреса
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Проверяет валидность российского номера телефона
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
  return phoneRegex.test(phone)
}

/**
 * Проверяет силу пароля
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0

  if (password.length < 8) {
    feedback.push('Пароль должен содержать минимум 8 символов')
  } else {
    score += 1
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Добавьте строчные буквы')
  } else {
    score += 1
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Добавьте заглавные буквы')
  } else {
    score += 1
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Добавьте цифры')
  } else {
    score += 1
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Добавьте специальные символы (!@#$%^&*)')
  } else {
    score += 1
  }

  return {
    isValid: score >= 4,
    score,
    feedback
  }
}

/**
 * Проверяет валидность суммы для конвертации
 */
export const isValidConversionAmount = (amount: string, minAmount: number = 0.01, maxAmount: number = 1000000): boolean => {
  const numAmount = Number(amount)
  return !isNaN(numAmount) && numAmount >= minAmount && numAmount <= maxAmount
}

/**
 * Проверяет валидность валютной пары
 */
export const isValidCurrencyPair = (fromCurrency: string, toCurrency: string, availableCurrencies: string[]): boolean => {
  return (
    fromCurrency !== toCurrency &&
    availableCurrencies.includes(fromCurrency) &&
    availableCurrencies.includes(toCurrency)
  )
}

/**
 * Проверяет валидность диапазона дат
 */
export const isValidDateRange = (fromDate: string, toDate: string): boolean => {
  if (!fromDate || !toDate) return true // Пустые даты считаются валидными

  const from = new Date(fromDate)
  const to = new Date(toDate)
  const now = new Date()

  return (
    !isNaN(from.getTime()) &&
    !isNaN(to.getTime()) &&
    from <= to &&
    from <= now &&
    to <= now
  )
}

/**
 * Проверяет валидность файла изображения для аватара
 */
export const isValidAvatarFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Поддерживаются только файлы JPEG, PNG и WebP'
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Размер файла не должен превышать 5MB'
    }
  }

  return { isValid: true }
}

/**
 * Проверяет валидность транзакционного хеша
 */
export const isValidTransactionHash = (hash: string): boolean => {
  // Проверяем на базовый формат хеша (hex строка)
  const hexRegex = /^0x[a-fA-F0-9]{40,}$/
  return hexRegex.test(hash)
}

/**
 * Проверяет является ли статус транзакции финальным
 */
export const isFinalTransactionStatus = (status: TransactionRecord['status']): boolean => {
  return ['completed', 'failed', 'cancelled'].includes(status)
}

/**
 * Проверяет может ли конвертация быть отменена
 */
export const canCancelConversion = (conversion: ConversionData): boolean => {
  return conversion.status === 'pending'
}

/**
 * Валидирует форму профиля
 */
export const validateProfileForm = (data: {
  name: string
  email: string
  phone: string
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Имя обязательно для заполнения'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  }

  if (!data.email.trim()) {
    errors.email = 'Email обязателен для заполнения'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Некорректный формат email'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Телефон обязателен для заполнения'
  } else if (!isValidPhoneNumber(data.phone)) {
    errors.phone = 'Некорректный формат номера телефона'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
