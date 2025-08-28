/**
 * Константы для профиля пользователя
 * Следует принципу DRY - избегаем дублирования данных
 */

// Размеры файлов
export const FILE_SIZE_LIMITS = {
  AVATAR_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024 // 10MB
} as const

// Поддерживаемые форматы файлов
export const SUPPORTED_FILE_TYPES = {
  AVATAR: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  DOCUMENT: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
} as const

// Ограничения на суммы
export const AMOUNT_LIMITS = {
  MIN_CONVERSION: 0.01,
  MAX_CONVERSION: 1000000,
  MIN_WITHDRAWAL: 10,
  MAX_WITHDRAWAL: 100000,
  DAILY_LIMIT: 500000
} as const

// Время сессии и безопасность
export const SECURITY_SETTINGS = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 минут в миллисекундах
  MAX_LOGIN_ATTEMPTS: 5,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_RESET_EXPIRY: 24 * 60 * 60 * 1000, // 24 часа
  TWO_FACTOR_CODE_LENGTH: 6
} as const

// Курсы обновления данных
export const REFRESH_INTERVALS = {
  PROFILE_DATA: 5 * 60 * 1000, // 5 минут
  EXCHANGE_RATES: 30 * 1000, // 30 секунд
  TRANSACTION_HISTORY: 2 * 60 * 1000, // 2 минуты
  CONVERSION_STATS: 10 * 60 * 1000 // 10 минут
} as const

// Лимиты пагинации
export const PAGINATION_LIMITS = {
  TRANSACTIONS_PER_PAGE: 20,
  CONVERSIONS_PER_PAGE: 15,
  MAX_PAGES_TO_LOAD: 50
} as const

// Статусы и их приоритеты
export const STATUS_PRIORITY = {
  completed: 1,
  pending: 2,
  failed: 3,
  cancelled: 4
} as const

// Цвета для статусов
export const STATUS_COLORS = {
  completed: '#28a745',
  pending: '#ffc107',
  failed: '#dc3545',
  cancelled: '#6c757d',
  active: '#007bff',
  inactive: '#6c757d',
  waiting: '#17a2b8'
} as const

// Иконки для типов транзакций
export const TRANSACTION_ICONS = {
  deposit: 'add_circle',
  withdrawal: 'remove_circle',
  conversion: 'swap_horiz',
  trade: 'trending_up',
  transfer: 'send'
} as const

// Периоды для статистики
export const STATS_PERIODS = {
  day: { label: 'День', value: 'day' },
  week: { label: 'Неделя', value: 'week' },
  month: { label: 'Месяц', value: 'month' },
  quarter: { label: 'Квартал', value: 'quarter' },
  year: { label: 'Год', value: 'year' }
} as const

// Валюты и их символы
export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  GBP: '£',
  JPY: '¥',
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮'
} as const

// Типы уведомлений
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

// API endpoints (для будущего использования)
export const API_ENDPOINTS = {
  PROFILE: '/api/profile',
  SECURITY: '/api/security',
  CONVERSIONS: '/api/conversions',
  TRANSACTIONS: '/api/transactions',
  UPLOAD_AVATAR: '/api/upload/avatar',
  EXCHANGE_RATES: '/api/rates'
} as const

// Breakpoints для responsive дизайна
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
} as const

// Анимации и продолжительность
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
} as const

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Проблемы с подключением к интернету',
  SERVER_ERROR: 'Ошибка сервера. Попробуйте позже',
  VALIDATION_ERROR: 'Проверьте правильность введенных данных',
  UNAUTHORIZED: 'Необходимо войти в систему',
  FORBIDDEN: 'Недостаточно прав доступа',
  NOT_FOUND: 'Запрашиваемый ресурс не найден'
} as const

// Успешные сообщения
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Профиль успешно обновлен',
  PASSWORD_CHANGED: 'Пароль успешно изменен',
  CONVERSION_COMPLETED: 'Конвертация выполнена успешно',
  TRANSACTION_SUBMITTED: 'Транзакция отправлена на обработку',
  TWO_FACTOR_ENABLED: 'Двухфакторная аутентификация включена',
  TWO_FACTOR_DISABLED: 'Двухфакторная аутентификация отключена'
} as const
