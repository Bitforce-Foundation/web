export interface UseScrollOptions {
  threshold?: number
  rootMargin?: string
}

export interface UseScrollReturn {
  isVisible: boolean
  elementRef: React.RefObject<HTMLElement>
}

export interface UseLocalStorageReturn<T> {
  value: T | null
  setValue: (value: T) => void
  removeValue: () => void
}

export interface UseViewportReturn {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export interface UseThemeReturn {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}
