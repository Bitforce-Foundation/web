import { useEffect, useCallback } from 'react'
import { TokenManager } from '../pages/registration/utils'

/**
 * Хук для обработки событий авторизации
 */
export const useAuthEvents = () => {
  const handleTokenExpired = useCallback(() => {
    console.log('🚫 Токены истекли - очищаем сессию')
    
    // Очищаем токены
    TokenManager.clearTokens()
    
    // Можно добавить редирект или показать уведомление
    // window.location.href = '/registration'
  }, [])

  const handleTokensUpdated = useCallback(() => {
    console.log('✅ Токены обновлены автоматически')
  }, [])

  useEffect(() => {
    // Подписываемся на события авторизации
    window.addEventListener('auth:token-expired', handleTokenExpired)
    window.addEventListener('auth:tokens-updated', handleTokensUpdated)

    return () => {
      // Очищаем подписки при размонтировании
      window.removeEventListener('auth:token-expired', handleTokenExpired)
      window.removeEventListener('auth:tokens-updated', handleTokensUpdated)
    }
  }, [handleTokenExpired, handleTokensUpdated])

  return {
    isAuthenticated: TokenManager.hasTokens()
  }
}

/**
 * Хук для получения текущих токенов
 */
export const useTokens = () => {
  return {
    accessToken: TokenManager.getAccessToken(),
    refreshToken: TokenManager.getRefreshToken(), 
    sessionId: TokenManager.getSessionId(),
    hasTokens: TokenManager.hasTokens(),
    clearTokens: TokenManager.clearTokens
  }
}