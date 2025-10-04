import { TokenManager } from '../pages/registration/utils'

/**
 * Перехватчик для автоматического обновления JWT токенов
 * Проверяет заголовки ответа на наличие новых токенов и сохраняет их
 */
export const createApiInterceptor = () => {
  // Перехватчик для fetch запросов
  const originalFetch = window.fetch

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const response = await originalFetch(input, init)

    const newAccessToken = response.headers.get('X-New-Access-Token')
    const newRefreshToken = response.headers.get('X-New-Refresh-Token')

    if (newAccessToken && newRefreshToken) {
      
      const currentSessionId = TokenManager.getSessionId()
      if (currentSessionId) {
        TokenManager.saveTokens({
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          session_id: currentSessionId,
          token_type: 'bearer',
          expires_in: 900
        })
        
        window.dispatchEvent(new CustomEvent('auth:tokens-updated'))
      }
    }

    if (response.status === 401) {
      console.log('🚫 Получена 401 ошибка - токены недействительны')
      
      TokenManager.clearTokens()
      
      window.dispatchEvent(new CustomEvent('auth:token-expired'))
    }

    return response
  }
}

/**
 * Восстановление оригинального fetch (для тестирования)
 */
export const restoreOriginalFetch = () => {
  // В реальном приложении можно сохранить ссылку на оригинальный fetch
  // для восстановления в случае необходимости
}

/**
 * Утилита для выполнения публичных API запросов с API ключом
 */
export const publicApiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const apiKey = import.meta.env.VITE_API
  
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      ...options.headers
    }
  }

  return fetch(url, requestOptions)
}

/**
 * Утилита для выполнения защищенных API запросов с JWT токеном
 */
export const authenticatedApiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  // Добавляем JWT токен в заголовки, если он есть
  const authHeader = TokenManager.getAuthHeader()
  
  if (!authHeader) {
    throw new Error('Отсутствует токен авторизации. Пожалуйста, войдите в систему.')
  }
  
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...authHeader
    }
  }

  return fetch(url, requestOptions)
}