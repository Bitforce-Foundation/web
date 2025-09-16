import { 
  useState, 
  useCallback, 
  useEffect 
} from 'react'

import {
  initialFormData
} from './data'

import type { 
  RegistrationFormData, 
  FormErrors, 
  RegistrationResponse, 
  SessionCreateData, 
  SessionResponse 
} from '../types'

import { 
  validateForm, 
  TokenManager 
} from '../utils'

import { 
  PostSessionAPI 
} from '../api/methods/session/post'

import { 
  PostRegistrationAPI 
} from '../api/methods/registration/post'

export { 
  useSessionActivity
} from './useSessionActivity'

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [session, setSession] = useState<SessionResponse | null>(null)

  const updateField = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  const validateFormData = useCallback(() => {
    const formErrors = validateForm(formData)
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setIsLoading(false)
    setIsSuccess(false)
    setSession(null)
  }, [])

  const submitForm = useCallback(async (): Promise<{ registration: RegistrationResponse; session: SessionResponse } | null> => {
    if (!validateFormData()) {
      return null
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Сначала регистрирует пользователя
      const registrationResponse = await PostRegistrationAPI.register_new_user(formData)
      
      // После успешной регистрации создает сессию
      const clientInfo = PostSessionAPI.IP.getClientInfo()
      const sessionData: SessionCreateData = {
        user_id: registrationResponse.user_id
      }
      
      // Добавляет опциональные поля только если они есть
      if (clientInfo.ip_address) {
        sessionData.ip_address = clientInfo.ip_address
      }
      
      if (clientInfo.user_agent) {
        sessionData.user_agent = clientInfo.user_agent
      }
      
      const sessionResponse = await PostSessionAPI.create_session(sessionData)
      
      // Сохраняет токены в localStorage
      TokenManager.saveTokens(sessionResponse)
      
      setSession(sessionResponse)
      setIsSuccess(true)
      
      return { 
        registration: registrationResponse, 
        session: sessionResponse 
      }
    } catch (error) {
      
      if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: 'Произошла неожиданная ошибка при регистрации или создании сессии' })
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }, [formData, validateFormData])

  const clearGeneralError = useCallback(() => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.general
      return newErrors
    })
  }, [])

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    session,
    updateField,
    validateFormData,
    resetForm,
    submitForm,
    clearGeneralError
  }
}

// Хук для работы с сессиями
export const useSession = () => {
  const [session, setSession] = useState<SessionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Проверяет наличие токенов при монтировании компонента
  useEffect(() => {
    const hasTokens = TokenManager.hasTokens()
    setIsAuthenticated(hasTokens)
    
    if (hasTokens) {
      // Восстанавливает информацию о сессии из localStorage
      const sessionId = TokenManager.getSessionId()
      const accessToken = TokenManager.getAccessToken()
      
      if (sessionId && accessToken) {
        setSession({
          session_id: sessionId,
          access_token: accessToken,
          refresh_token: TokenManager.getRefreshToken() || '',
          token_type: 'bearer',
          expires_in: 0
        })
      }
    }
  }, [])

  // Выход из системы
  const logout = useCallback(() => {
    TokenManager.clearTokens()
    setSession(null)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  // Создание новой сессии
  const createSession = useCallback(async (userId: string): Promise<SessionResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      // Получает информацию о клиенте с IP-адресом
      const clientInfo = await PostSessionAPI.IP.getClientInfoAsync()

      const sessionData: SessionCreateData = {
        user_id: userId,
        ip_address: clientInfo.ip_address || undefined,
        user_agent: clientInfo.user_agent,
      }

      const response = await PostSessionAPI.create_session(sessionData)
      
      // Сохраняет токены
      TokenManager.saveTokens(response)
      
      setSession(response)
      setIsAuthenticated(true)
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      console.error('Session creation error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Обновление токенов
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    const refreshToken = TokenManager.getRefreshToken()
    if (!refreshToken) {
      setError('Токен обновления отсутствует')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      const clientInfo = await PostSessionAPI.IP.getClientInfoAsync()
      const response = await PostSessionAPI.refresh_token(
        refreshToken, 
        clientInfo.ip_address || undefined, 
        clientInfo.user_agent
      )
      
      // Сохраняет новые токены
      TokenManager.saveTokens({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        session_id: response.session_id,
        token_type: 'bearer',
        expires_in: response.expires_in
      })
      
      // Обновляет состояние сессии
      setSession(prev => prev ? {
        ...prev,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        expires_in: response.expires_in,
        session_id: response.session_id
      } : null)
      
      setIsAuthenticated(true)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка обновления токенов'
      setError(errorMessage)
      console.error('Token refresh error:', err)
      
      // При ошибке очищает сессию
      logout()
      return false
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  // Валидация сессии
  const validateSession = useCallback(async (jti: string): Promise<boolean> => {
    const sessionId = TokenManager.getSessionId()
    if (!sessionId) {
      setError('Session ID отсутствует')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await PostSessionAPI.validate_session(sessionId, jti)

      if (response.is_valid) {
        setIsAuthenticated(true)
        return true
      } else {
        setError(response.reason || 'Сессия недействительна')
        logout()
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка валидации сессии'
      setError(errorMessage)
      console.error('Session validation error:', err)
      logout()
      return false
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  // Отзыв текущей сессии
  const revokeCurrentSession = useCallback(async (reason?: string): Promise<boolean> => {
    const sessionId = TokenManager.getSessionId()
    if (!sessionId) {
      setError('Session ID отсутствует')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      await PostSessionAPI.revoke_session(sessionId, reason)
      logout()
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка отзыва сессии'
      setError(errorMessage)
      console.error('Session revoke error:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  // Получение заголовка авторизации
  const getAuthHeader = useCallback((): { Authorization: string } | null => {
    return TokenManager.getAuthHeader()
  }, [])

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    session,
    isLoading,
    error,
    isAuthenticated,
    createSession,
    refreshTokens,
    validateSession,
    revokeCurrentSession,
    logout,
    getAuthHeader,
    clearError
  }
}
