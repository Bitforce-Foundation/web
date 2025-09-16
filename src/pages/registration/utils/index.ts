import type { RegistrationFormData, FormErrors, SessionResponse } from '../types'


export const validateForm = (data: RegistrationFormData): FormErrors => {
  const errors: FormErrors = {}

  if (!data.username || data.username.length < 3) {
    errors.username = 'Логин должен содержать минимум 3 символа'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email) {
    errors.email = 'Email обязателен'
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Некорректный формат email'
  }

  const phoneRegex = /^(\+7|8)[0-9]{10}$/
  if (!data.phone) {
    errors.phone = 'Телефон обязателен'
  } else if (!phoneRegex.test(data.phone.replace(/\s|-|\(|\)/g, ''))) {
    errors.phone = 'Некорректный российский номер телефона'
  }

  if (!data.full_name || data.full_name.trim().length < 2) {
    errors.full_name = 'ФИО должно содержать минимум 2 символа'
  }

  if (!data.birth_date) {
    errors.birth_date = 'Дата рождения обязательна (формат: YYYY-MM-DD)'
  } else {
    const birthDate = new Date(data.birth_date)
    const today = new Date()
    
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
      
      if (birthDate > today) {
        errors.birth_date = 'Дата рождения не может быть в будущем'
      }
    }
  }

  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  if (!data.eth_wallet_address) {
    errors.eth_wallet_address = 'Адрес Ethereum кошелька обязателен'
  } else if (!ethAddressRegex.test(data.eth_wallet_address)) {
    errors.eth_wallet_address = 'Некорректный адрес Ethereum кошелька'
  }

  const bankAccountRegex = /^[0-9]{20}$/
  if (!data.bank_account_number) {
    errors.bank_account_number = 'Номер банковского счета обязателен'
  } else if (!bankAccountRegex.test(data.bank_account_number)) {
    errors.bank_account_number = 'Номер банковского счета должен содержать 20 цифр'
  }

  const cardRegex = /^[0-9]{16}$/
  if (!data.bank_card_number) {
    errors.bank_card_number = 'Номер банковской карты обязателен'
  } else if (!cardRegex.test(data.bank_card_number.replace(/\s/g, ''))) {
    errors.bank_card_number = 'Номер карты должен содержать 16 цифр'
  }

  if (!data.password) {
    errors.password = 'Пароль обязателен'
  } else if (data.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов'
  }

  if (!data.password_confirm) {
    errors.password_confirm = 'Подтверждение пароля обязательно'
  } else if (data.password !== data.password_confirm) {
    errors.password_confirm = 'Пароли не совпадают'
  }

  return errors
}

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  
  if (cleaned.startsWith('8')) {
    return '+7' + cleaned.slice(1)
  }
  
  if (cleaned.startsWith('7')) {
    return '+' + cleaned
  }
  
  if (cleaned.length > 0 && !cleaned.startsWith('7')) {
    return '+7' + cleaned
  }
  
  return cleaned ? '+7' + cleaned : ''
}

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const formatBankAccount = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  
  return cleaned.slice(0, 20)
}

export const formatBik = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  
  return cleaned.slice(0, 9)
}

// Упрощенные утилиты для работы с токенами
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
  
  // Очистка всех токенов
  clearTokens: (): void => {
    localStorage.removeItem(TokenManager.ACCESS_TOKEN_KEY)
    localStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY)
    localStorage.removeItem(TokenManager.SESSION_ID_KEY)
  },
  
  // Проверка наличия токенов
  hasTokens: (): boolean => {
    const accessToken = TokenManager.getAccessToken()
    const sessionId = TokenManager.getSessionId()
    return !!(accessToken && sessionId)
  },
  
  // Создание заголовка авторизации просто возвращает токен
  getAuthHeader: (): { Authorization: string } | null => {
    const token = TokenManager.getAccessToken()
    if (!token) return null
    
    return { Authorization: `Bearer ${token}` }
  }
}
