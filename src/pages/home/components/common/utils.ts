/**
 * Объединяет CSS классы, фильтруя пустые значения
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Создает debounced функцию
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Создает throttled функцию
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * Форматирует число с разделителями тысяч
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num)
}

/**
 * Форматирует валюту
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'RUB'
): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Проверяет, является ли устройство мобильным
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768
}

/**
 * Проверяет, является ли браузер Safari
 */
export const isSafari = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

/**
 * Получает параметры URL
 */
export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search)
}

/**
 * Скроллит к элементу
 */
export const scrollToElement = (
  elementId: string, 
  offset: number = 0
): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
  }
}
