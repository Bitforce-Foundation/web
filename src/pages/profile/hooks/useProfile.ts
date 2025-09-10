import { useState, useEffect, useCallback } from 'react'
import { GetSessionAPI } from '../../registration/api/methods/session/get'
import { GetUser } from '../../registration/api/methods/registration/get'
import { PostSessionAPI } from '../../registration/api/methods/session/post'
import { PostLoginAPI } from '../api/methods/post'
import { TokenManager } from '../../registration/utils'
import type { SessionInfo, UserInfoResponse, SessionCreateData } from '../../registration/types'

interface LoginCredentials {
  username: string
  password: string
}

export const useProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null)
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  // Валидация сессии и загрузка данных пользователя
  const validateAndLoadProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Получает session_id из localStorage
      const sessionId = TokenManager.getSessionId()
      
      if (!sessionId) {
        setIsAuthenticated(false)
        return
      }

      // Получает информацию о сессии
      const sessionData: SessionInfo = await GetSessionAPI.get_session_by_id(sessionId)
      setSessionInfo(sessionData)

      // Проверяет, что сессия действительна (не отозвана и не истекла)
      const isRevoked = !!sessionData.revoked_at
      const isExpired = new Date(sessionData.expires_at) < new Date()

      if (isRevoked || isExpired) {
        setIsAuthenticated(false)
        TokenManager.clearTokens()
        return
      }

      // Если сессия валидна, получает информацию о пользователе
      const userData: UserInfoResponse = await GetUser.user({ user_id: sessionData.user_id })
      
      setUserInfo(userData)
      setIsAuthenticated(true)

    } catch (error) {
      console.error('Ошибка при валидации сессии:', error)
      setError(error instanceof Error ? error.message : 'Ошибка валидации сессии')
      setIsAuthenticated(false)
      TokenManager.clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Логин пользователя
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoginLoading(true)
      setError(null)

      // Сначала проверяет учетные данные
      const loginResult = await PostLoginAPI.login(credentials)
      
      if (!loginResult.status) {
        throw new Error(loginResult.message || 'Неверные учетные данные')
      }

      // Если логин успешен и есть user_id, создает сессию
      if (loginResult.user_id) {
        // Получает информацию о клиенте
        const clientInfo = PostSessionAPI.IP.getClientInfo()
        
        const sessionData: SessionCreateData = {
          user_id: loginResult.user_id,
          ip_address: clientInfo.ip_address || undefined,
          user_agent: clientInfo.user_agent || undefined
        }

        // Создает сессию
        const sessionResponse = await PostSessionAPI.create_session(sessionData)
        
        // Сохраняет токены в localStorage
        TokenManager.saveTokens(sessionResponse)
        
        // После создания сессии перезагружает профиль
        await validateAndLoadProfile()
        return true
      } else {
        // Если API не возвращает user_id, пытается перезагрузить профиль
        await validateAndLoadProfile()
        return true
      }

    } catch (error) {
      console.error('Ошибка логина:', error)
      setError(error instanceof Error ? error.message : 'Ошибка авторизации')
      return false
    } finally {
      setIsLoginLoading(false)
    }
  }, [validateAndLoadProfile])

  // Выход из системы
  const logout = useCallback(() => {
    TokenManager.clearTokens()
    setUserInfo(null)
    setSessionInfo(null)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Перезагрузка профиля
  const refetchProfile = useCallback(() => {
    return validateAndLoadProfile()
  }, [validateAndLoadProfile])

  // Инициализация при монтировании
  useEffect(() => {
    validateAndLoadProfile()
  }, [validateAndLoadProfile])

  return {
    userInfo,
    sessionInfo,
    isLoading,
    isAuthenticated,
    error,
    isLoginLoading,
    login,
    logout,
    clearError,
    refetchProfile,
  }
}
