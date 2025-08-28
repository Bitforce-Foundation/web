/**
 * Плавно скроллит к элементу
 */
export const smoothScrollTo = (
  element: HTMLElement | string,
  offset: number = 0,
  duration: number = 500
): void => {
  const targetElement = typeof element === 'string' 
    ? document.getElementById(element) || document.querySelector(element)
    : element

  if (!targetElement) return

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
    
    window.scrollTo(0, run)
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

/**
 * Easing функция для плавной анимации
 */
const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/**
 * Проверяет, виден ли элемент в viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Получает позицию элемента относительно документа
 */
export const getElementPosition = (element: HTMLElement): { top: number; left: number } => {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  }
}

/**
 * Добавляет CSS класс с анимацией
 */
export const addClassWithAnimation = (
  element: HTMLElement,
  className: string,
  duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    element.classList.add(className)
    
    const handleAnimationEnd = () => {
      element.removeEventListener('animationend', handleAnimationEnd)
      resolve()
    }
    
    element.addEventListener('animationend', handleAnimationEnd)
    
    // Fallback на случай, если анимация не запустится
    setTimeout(() => {
      element.removeEventListener('animationend', handleAnimationEnd)
      resolve()
    }, duration)
  })
}

/**
 * Создает debounced функцию
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
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
): (...args: Parameters<T>) => void => {
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
 * Копирует текст в буфер обмена
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-999999px'
      textarea.style.top = '-999999px'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      
      const result = document.execCommand('copy')
      document.body.removeChild(textarea)
      return result
    }
  } catch (error) {
    console.error('Failed to copy text: ', error)
    return false
  }
}

/**
 * Генерирует уникальный ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Проверяет поддержку функции браузером
 */
export const supportsFeature = (feature: string): boolean => {
  switch (feature) {
    case 'localStorage':
      try {
        const test = 'test'
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return true
      } catch {
        return false
      }
    case 'sessionStorage':
      try {
        const test = 'test'
        sessionStorage.setItem(test, test)
        sessionStorage.removeItem(test)
        return true
      } catch {
        return false
      }
    case 'webp':
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    default:
      return false
  }
}
