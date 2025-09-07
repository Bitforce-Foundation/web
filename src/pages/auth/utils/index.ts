import type { RegistrationFormData, FormErrors, SessionResponse } from '../types'


export const validateForm = (data: RegistrationFormData): FormErrors => {
  const errors: FormErrors = {}

  // Валидация логина
  if (!data.username || data.username.length < 3) {
    errors.username = 'Логин должен содержать минимум 3 символа'
  }

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email) {
    errors.email = 'Email обязателен'
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Некорректный формат email'
  }

  // Валидация телефона (российский номер)
  const phoneRegex = /^(\+7|8)[0-9]{10}$/
  if (!data.phone) {
    errors.phone = 'Телефон обязателен'
  } else if (!phoneRegex.test(data.phone.replace(/\s|-|\(|\)/g, ''))) {
    errors.phone = 'Некорректный российский номер телефона'
  }

  // Валидация ФИО
  if (!data.full_name || data.full_name.trim().length < 2) {
    errors.full_name = 'ФИО должно содержать минимум 2 символа'
  }

  // Валидация даты рождения (минимум 18 лет)
  if (!data.birth_date) {
    errors.birth_date = 'Дата рождения обязательна (формат: YYYY-MM-DD)'
  } else {
    const birthDate = new Date(data.birth_date)
    const today = new Date()
    
    // Проверяем, что дата валидна
    if (isNaN(birthDate.getTime())) {
      errors.birth_date = 'Некорректная дата рождения (формат: YYYY-MM-DD)'
    } else {
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        if (age - 1 < 18) {
          errors.birth_date = 'Возраст должен быть не менее 18 лет'
        }
      } else if (age < 18) {
        errors.birth_date = 'Возраст должен быть не менее 18 лет'
      }
      
      // Проверяем, что дата не в будущем
      if (birthDate > today) {
        errors.birth_date = 'Дата рождения не может быть в будущем'
      }
    }
  }

  // Валидация адреса Ethereum кошелька
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  if (!data.eth_wallet_address) {
    errors.eth_wallet_address = 'Адрес Ethereum кошелька обязателен'
  } else if (!ethAddressRegex.test(data.eth_wallet_address)) {
    errors.eth_wallet_address = 'Некорректный адрес Ethereum кошелька'
  }

  // Валидация номера банковского счета (20 цифр)
  const bankAccountRegex = /^[0-9]{20}$/
  if (!data.bank_account_number) {
    errors.bank_account_number = 'Номер банковского счета обязателен'
  } else if (!bankAccountRegex.test(data.bank_account_number)) {
    errors.bank_account_number = 'Номер банковского счета должен содержать 20 цифр'
  }

  // Валидация БИК (9 цифр)
  const bikRegex = /^[0-9]{9}$/
  if (!data.bank_bik) {
    errors.bank_bik = 'БИК банка обязателен'
  } else if (!bikRegex.test(data.bank_bik)) {
    errors.bank_bik = 'БИК должен содержать 9 цифр'
  }

  // Валидация номера банковской карты (16 цифр)
  const cardRegex = /^[0-9]{16}$/
  if (!data.bank_card_number) {
    errors.bank_card_number = 'Номер банковской карты обязателен'
  } else if (!cardRegex.test(data.bank_card_number.replace(/\s/g, ''))) {
    errors.bank_card_number = 'Номер карты должен содержать 16 цифр'
  }

  // Валидация пароля
  if (!data.password) {
    errors.password = 'Пароль обязателен'
  } else if (data.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов'
  }

  // Валидация подтверждения пароля
  if (!data.password_confirm) {
    errors.password_confirm = 'Подтверждение пароля обязательно'
  } else if (data.password !== data.password_confirm) {
    errors.password_confirm = 'Пароли не совпадают'
  }

  return errors
}

export const formatPhoneNumber = (value: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = value.replace(/\D/g, '')
  
  // Если начинается с 8, заменяем на +7
  if (cleaned.startsWith('8')) {
    return '+7' + cleaned.slice(1)
  }
  
  // Если начинается с 7, добавляем +
  if (cleaned.startsWith('7')) {
    return '+' + cleaned
  }
  
  // Если не начинается с 7 или 8, добавляем +7
  if (cleaned.length > 0 && !cleaned.startsWith('7')) {
    return '+7' + cleaned
  }
  
  return cleaned ? '+7' + cleaned : ''
}

export const formatCardNumber = (value: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = value.replace(/\D/g, '')
  
  // Добавляем пробелы каждые 4 цифры
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const formatBankAccount = (value: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = value.replace(/\D/g, '')
  
  // Ограничиваем до 20 цифр
  return cleaned.slice(0, 20)
}

export const formatBik = (value: string): string => {
  // Удаляем все символы кроме цифр
  const cleaned = value.replace(/\D/g, '')
  
  // Ограничиваем до 9 цифр
  return cleaned.slice(0, 9)
}

// Утилиты для работы с токенами и сессиями

export const TokenManager = {
  // Ключи для localStorage
  ACCESS_TOKEN_KEY: 'access_token.bitforce',
  REFRESH_TOKEN_KEY: 'refresh_token.bitforce',
  SESSION_ID_KEY: 'session_id.bitforce',
  
  // Сохранение токенов из ответа сессии
  saveTokens: (sessionResponse: SessionResponse): void => {
    localStorage.setItem(TokenManager.ACCESS_TOKEN_KEY, sessionResponse.access_token)
    localStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, sessionResponse.refresh_token)
    localStorage.setItem(TokenManager.SESSION_ID_KEY, sessionResponse.session_id)
    
    // Сохраняем время истечения токена
    const expiresAt = Date.now() + (sessionResponse.expires_in * 1000)
    localStorage.setItem('token_expires_at.bitforce', expiresAt.toString())
  },
  
  // Сохранение обновленных токенов
  saveRefreshedTokens: (refreshResponse: { access_token: string; refresh_token: string; expires_in: number }): void => {
    localStorage.setItem(TokenManager.ACCESS_TOKEN_KEY, refreshResponse.access_token)
    localStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, refreshResponse.refresh_token)
    
    // Обновляем время истечения токена
    const expiresAt = Date.now() + (refreshResponse.expires_in * 1000)
    localStorage.setItem('token_expires_at', expiresAt.toString())
  },
  
  // Получение токенов
  getAccessToken: (): string | null => {
    return localStorage.getItem(TokenManager.ACCESS_TOKEN_KEY)
  },
  
  getRefreshToken: (): string | null => {
    return localStorage.getItem(TokenManager.REFRESH_TOKEN_KEY)
  },
  
  getSessionId: (): string | null => {
    return localStorage.getItem(TokenManager.SESSION_ID_KEY)
  },
  
  // Проверка истечения токена
  isTokenExpired: (): boolean => {
    const expiresAt = localStorage.getItem('token_expires_at')
    if (!expiresAt) return true
    
    return Date.now() > parseInt(expiresAt)
  },
  
  // Проверка истечения токена в ближайшие 5 минут
  isTokenExpiringSoon: (): boolean => {
    const expiresAt = localStorage.getItem('token_expires_at')
    if (!expiresAt) return true
    
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000) // 5 минут
    return fiveMinutesFromNow > parseInt(expiresAt)
  },
  
  // Очистка всех токенов
  clearTokens: (): void => {
    localStorage.removeItem(TokenManager.ACCESS_TOKEN_KEY)
    localStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY)
    localStorage.removeItem(TokenManager.SESSION_ID_KEY)
    localStorage.removeItem('token_expires_at')
  },
  
  // Проверка наличия активной сессии
  hasActiveSession: (): boolean => {
    const accessToken = TokenManager.getAccessToken()
    const sessionId = TokenManager.getSessionId()
    
    return !!(accessToken && sessionId && !TokenManager.isTokenExpired())
  },
  
  // Создание заголовка авторизации
  getAuthHeader: (): { Authorization: string } | null => {
    const token = TokenManager.getAccessToken()
    if (!token || TokenManager.isTokenExpired()) {
      return null
    }
    
    return { Authorization: `Bearer ${token}` }
  },
  
  getAuthHeaderWithRefresh: async (): Promise<{ Authorization: string } | null> => {
    // Если токен скоро истечет, попытаемся его обновить
    if (TokenManager.isTokenExpiringSoon()) {
      const refreshToken = TokenManager.getRefreshToken()
      if (refreshToken) {
        try {
          // Динамический импорт, чтобы избежать циклических зависимостей
          const { PostSessionAPI } = await import('../api/methods/session/post')
          
          // Получаем информацию о клиенте для refresh запроса
          const clientInfo = PostSessionAPI.IP.getClientInfo()
          const refreshResponse = await PostSessionAPI.refresh_token(
            refreshToken,
            clientInfo.ip_address,
            clientInfo.user_agent
          )
          
          TokenManager.saveRefreshedTokens(refreshResponse)
        } catch (error) {
          console.error('Ошибка обновления токена:', error)
          TokenManager.clearTokens()
          return null
        }
      }
    }
    
    return TokenManager.getAuthHeader()
  }
}
