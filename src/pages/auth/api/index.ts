import type { 
  RegistrationFormData, 
  RegistrationResponse, 
  SessionCreateData, 
  SessionResponse, 
  RefreshTokenData, 
  RefreshTokenResponse,
  SessionValidateData,
  SessionValidateResponse,
  SessionRevokeData,
  SessionRevokeResponse,
  UserSessionsParams,
  UserSessionsResponse,
  RevokeAllSessionsParams,
  SessionInfo
} from '../types'

const API_BASE_URL = 'http://0.0.0.0:8080'

export class RegistrationAPI {
  static async register(data: RegistrationFormData): Promise<RegistrationResponse> {
    console.log('Отправляемые данные для регистрации:', data)

    const response = await fetch(`${API_BASE_URL}/api/v1/registration/initial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Обрабатываем разные типы ошибок
      if (response.status === 422) {
        // Ошибка валидации - показываем детали
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else if (response.status === 409) {
        // Конфликт - пользователь уже существует
        throw new Error(errorData.message || 'Пользователь с такими данными уже существует')
      } else {
        // Другие ошибки
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }
}

export class SessionAPI {
  static async createSession(data: SessionCreateData): Promise<SessionResponse> {
    console.log('Отправляемые данные для создания сессии:', data)
    console.log('JSON данные:', JSON.stringify(data, null, 2))

    const response = await fetch(`${API_BASE_URL}/api/v1/session/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log('Статус ответа:', response.status)
    console.log('Заголовки ответа:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorData = await response.json()
      console.log('Данные ошибки:', errorData)
      
      // Обрабатываем разные типы ошибок
      if (response.status === 422) {
        // Ошибка валидации - показываем детали
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else if (response.status === 500) {
        // Внутренняя ошибка сервера
        throw new Error(errorData.detail || 'Внутренняя ошибка сервера')
      } else {
        // Другие ошибки
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для получения информации о текущем IP адресе клиента
  static getClientInfo(): { ip_address?: string; user_agent?: string } {
    return {
      ip_address: undefined, // В браузере нельзя получить реальный IP
      user_agent: navigator.userAgent,
    }
  }

  // Метод для обновления токенов
  static async refreshToken(refreshToken: string, ipAddress?: string, userAgent?: string): Promise<RefreshTokenResponse> {
    console.log('Обновление токенов...')

    const requestBody: RefreshTokenData = {
      refresh_token: refreshToken,
    }

    // Добавляем опциональные параметры если они переданы
    if (ipAddress) {
      requestBody.ip_address = ipAddress
    }
    
    if (userAgent) {
      requestBody.user_agent = userAgent
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/session/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Обрабатываем разные типы ошибок
      if (response.status === 401) {
        // Неавторизован - токен недействителен
        throw new Error(errorData.message || 'Токен недействителен. Необходимо войти в систему заново.')
      } else if (response.status === 422) {
        // Ошибка валидации
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else if (response.status === 500) {
        // Внутренняя ошибка сервера
        throw new Error(errorData.message || 'Внутренняя ошибка сервера')
      } else {
        // Другие ошибки
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для валидации сессии
  static async validateSession(sessionId: string, jti: string): Promise<SessionValidateResponse> {
    console.log('Валидация сессии:', sessionId)

    const requestBody: SessionValidateData = {
      session_id: sessionId,
      jti: jti,
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/session/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для отзыва сессии
  static async revokeSession(sessionId: string, reason?: string): Promise<SessionRevokeResponse> {
    console.log('Отзыв сессии:', sessionId)

    const requestBody: SessionRevokeData = {
      session_id: sessionId,
    }

    if (reason) {
      requestBody.reason = reason
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/session/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для получения сессий пользователя
  static async getUserSessions(params: UserSessionsParams): Promise<UserSessionsResponse> {
    console.log('Получение сессий пользователя:', params.user_id)

    const searchParams = new URLSearchParams()
    
    if (params.active_only !== undefined) {
      searchParams.append('active_only', params.active_only.toString())
    }
    
    if (params.limit !== undefined) {
      searchParams.append('limit', params.limit.toString())
    }
    
    if (params.offset !== undefined) {
      searchParams.append('offset', params.offset.toString())
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/session/user/${params.user_id}?${searchParams.toString()}`)

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для получения сессии по ID
  static async getSessionById(sessionId: string): Promise<SessionInfo> {
    console.log('Получение сессии по ID:', sessionId)

    const response = await fetch(`${API_BASE_URL}/api/v1/session/${sessionId}`)

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 404) {
        throw new Error(errorData.message || 'Сессия не найдена')
      } else if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }

  // Метод для отзыва всех сессий пользователя
  static async revokeAllUserSessions(params: RevokeAllSessionsParams): Promise<Record<string, unknown>> {
    console.log('Отзыв всех сессий пользователя:', params.user_id)

    const searchParams = new URLSearchParams()
    
    if (params.exclude_session_id) {
      searchParams.append('exclude_session_id', params.exclude_session_id)
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/session/user/${params.user_id}/revoke-all?${searchParams.toString()}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      if (response.status === 422) {
        const details = errorData.detail || []
        const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
          `${error.loc.join('.')}: ${error.msg}`
        ).join('; ')
        throw new Error(`Ошибка валидации: ${errorMessages}`)
      } else {
        throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`)
      }
    }

    return response.json()
  }
}
