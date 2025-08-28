import { useState, useEffect, useCallback } from 'react'
import type { UseLocalStorageReturn } from './types'

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue || null
    }
  })

  const setStoredValue = useCallback((newValue: T) => {
    try {
      setValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  const removeValue = useCallback(() => {
    try {
      setValue(null)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return {
    value,
    setValue: setStoredValue,
    removeValue
  }
}
