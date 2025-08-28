import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { UseThemeReturn } from './types'

export const useTheme = (): UseThemeReturn => {
  const { value: theme, setValue: setStoredTheme } = useLocalStorage<'light' | 'dark'>('theme', 'light')

  const currentTheme = theme || 'light'

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setStoredTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [setStoredTheme])

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [currentTheme, setTheme])

  // Применяем тему при инициализации
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme
  }
}
