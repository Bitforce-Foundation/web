import { useState, useCallback, useEffect } from 'react'
import type { RegistrationFormData, FormErrors, RegistrationResponse, SessionCreateData, SessionResponse } from '../types'
import { validateForm, TokenManager } from '../utils'
import { RegistrationAPI, SessionAPI } from '../api'

const initialFormData: RegistrationFormData = {
  username: '',
  email: '',
  phone: '',
  full_name: '',
  birth_date: '',
  eth_wallet_address: '',
  bank_account_number: '',
  bank_bik: '',
  bank_card_number: '',
  password: '',
  password_confirm: ''
}

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [session, setSession] = useState<SessionResponse | null>(null)

  const updateField = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаем ошибку для этого поля при изменении
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
      // Сначала регистрируем пользователя
      const registrationResponse = await RegistrationAPI.register(formData)
      console.log('Пользователь зарегистрирован:', registrationResponse)
      
      // После успешной регистрации создаем сессию
      const clientInfo = SessionAPI.getClientInfo()
      const sessionData: SessionCreateData = {
        user_id: registrationResponse.user_id, // Используем user_id вместо id
      }
      
      // Добавляем опциональные поля только если они есть
      if (clientInfo.ip_address) {
        sessionData.ip_address = clientInfo.ip_address
      }
      
      if (clientInfo.user_agent) {
        sessionData.user_agent = clientInfo.user_agent
      }
      
      console.log('Данные для создания сессии:', sessionData)

      const sessionResponse = await SessionAPI.createSession(sessionData)
      console.log('Сессия создана:', sessionResponse)
      
      // Сохраняем токены в localStorage
      TokenManager.saveTokens(sessionResponse)
      
      setSession(sessionResponse)
      setIsSuccess(true)
      
      return { 
        registration: registrationResponse, 
        session: sessionResponse 
      }
    } catch (error) {
      console.error('Registration or session creation error:', error)
      
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

  // Проверяем наличие активной сессии при монтировании компонента
  useEffect(() => {
    const hasSession = TokenManager.hasActiveSession()
    setIsAuthenticated(hasSession)
    
    if (hasSession) {
      // Восстанавливаем информацию о сессии из localStorage
      const sessionId = TokenManager.getSessionId()
      const accessToken = TokenManager.getAccessToken()
      
      if (sessionId && accessToken) {
        setSession({
          session_id: sessionId,
          access_token: accessToken,
          refresh_token: TokenManager.getRefreshToken() || '',
          token_type: 'bearer',
          expires_in: 0 // Не храним это значение в localStorage
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
      // Получаем информацию о клиенте
      const clientInfo = SessionAPI.getClientInfo()
      
      const sessionData: SessionCreateData = {
        user_id: userId,
        ip_address: clientInfo.ip_address,
        user_agent: clientInfo.user_agent,
      }

      const response = await SessionAPI.createSession(sessionData)
      
      // Сохраняем токены
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
      // Получаем информацию о клиенте для refresh запроса
      const clientInfo = SessionAPI.getClientInfo()
      const response = await SessionAPI.refreshToken(
        refreshToken, 
        clientInfo.ip_address, 
        clientInfo.user_agent
      )
      
      // Сохраняем обновленные токены
      TokenManager.saveRefreshedTokens(response)
      
      // Обновляем состояние сессии
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
      
      // При ошибке обновления токенов очищаем сессию
      TokenManager.clearTokens()
      setSession(null)
      setIsAuthenticated(false)
      setError(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

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
      const response = await SessionAPI.validateSession(sessionId, jti)
      
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
      await SessionAPI.revokeSession(sessionId, reason)
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
  const getAuthHeader = useCallback(async (): Promise<{ Authorization: string } | null> => {
    return await TokenManager.getAuthHeaderWithRefresh()
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
