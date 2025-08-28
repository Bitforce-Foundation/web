import type {
  UserProfile,
  SecuritySettings,
  ConversionData,
  ConversionStats,
  TransactionRecord,
  NavigationSection
} from './Types'

// Mock user profile data
export const mockUserProfile: UserProfile = {
  id: 'user_001',
  name: 'Иван Петров',
  email: 'ivan.petrov@example.com',
  phone: '+7 (999) 123-45-67',
  registrationDate: '2023-03-15T10:30:00Z',
  lastLogin: '2025-08-28T08:15:00Z',
  isVerified: true,
  accountStatus: 'active'
}

// Mock security settings
export const mockSecuritySettings: SecuritySettings = {
  isTwoFactorEnabled: true,
  lastPasswordChange: '2025-07-28T10:00:00Z',
  activeSessions: 3,
  trustedDevices: 2
}

// Mock conversion data
export const mockConversionHistory: ConversionData[] = [
  {
    id: 'conv_001',
    date: '2025-08-28T10:30:00Z',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    fromAmount: 1000,
    toAmount: 850,
    exchangeRate: 0.85,
    fee: 5,
    status: 'completed',
    transactionHash: '0x1234567890abcdef'
  },
  {
    id: 'conv_002',
    date: '2025-08-27T15:45:00Z',
    fromCurrency: 'BTC',
    toCurrency: 'USD',
    fromAmount: 0.5,
    toAmount: 22500,
    exchangeRate: 45000,
    fee: 25,
    status: 'completed',
    transactionHash: '0xabcdef1234567890'
  },
  {
    id: 'conv_003',
    date: '2025-08-26T09:15:00Z',
    fromCurrency: 'EUR',
    toCurrency: 'RUB',
    fromAmount: 500,
    toAmount: 45000,
    exchangeRate: 90,
    fee: 10,
    status: 'pending'
  },
  {
    id: 'conv_004',
    date: '2025-08-25T14:20:00Z',
    fromCurrency: 'USD',
    toCurrency: 'ETH',
    fromAmount: 2000,
    toAmount: 0.8,
    exchangeRate: 0.0004,
    fee: 15,
    status: 'failed'
  }
]

// Mock conversion statistics
export const mockConversionStats: Record<string, ConversionStats> = {
  week: {
    totalVolume: 15420,
    totalConversions: 8,
    averageAmount: 1927.5,
    popularPairs: [
      { pair: 'USD/EUR', count: 3, volume: 8500 },
      { pair: 'BTC/USD', count: 2, volume: 5200 },
      { pair: 'ETH/USD', count: 3, volume: 1720 }
    ],
    totalSavings: 245,
    currency: 'USD',
    period: 'week'
  },
  month: {
    totalVolume: 65830,
    totalConversions: 24,
    averageAmount: 2742.9,
    popularPairs: [
      { pair: 'USD/EUR', count: 8, volume: 32500 },
      { pair: 'BTC/USD', count: 6, volume: 18200 },
      { pair: 'ETH/USD', count: 10, volume: 15130 }
    ],
    totalSavings: 1024,
    currency: 'USD',
    period: 'month'
  },
  quarter: {
    totalVolume: 198450,
    totalConversions: 67,
    averageAmount: 2961.9,
    popularPairs: [
      { pair: 'BTC/USD', count: 24, volume: 89500 },
      { pair: 'USD/EUR', count: 22, volume: 65200 },
      { pair: 'ETH/USD', count: 21, volume: 43750 }
    ],
    totalSavings: 3180,
    currency: 'USD',
    period: 'quarter'
  },
  year: {
    totalVolume: 742680,
    totalConversions: 189,
    averageAmount: 3929.5,
    popularPairs: [
      { pair: 'BTC/USD', count: 78, volume: 324500 },
      { pair: 'USD/EUR', count: 64, volume: 248900 },
      { pair: 'ETH/USD', count: 47, volume: 169280 }
    ],
    totalSavings: 12450,
    currency: 'USD',
    period: 'year'
  }
}

// Mock transaction history
export const mockTransactionHistory: TransactionRecord[] = [
  {
    id: 'tx_001',
    date: '2025-08-28T10:30:00Z',
    type: 'conversion',
    amount: 1000,
    currency: 'USD',
    status: 'completed',
    description: 'Конвертация USD → EUR',
    fee: 5,
    transactionHash: '0x1234567890abcdef'
  },
  {
    id: 'tx_002',
    date: '2025-08-27T15:45:00Z',
    type: 'deposit',
    amount: 5000,
    currency: 'USD',
    status: 'completed',
    description: 'Пополнение торгового счета',
    fee: 0,
    relatedAccount: 'MT5_001'
  },
  {
    id: 'tx_003',
    date: '2025-08-26T09:15:00Z',
    type: 'trade',
    amount: 350,
    currency: 'USD',
    status: 'completed',
    description: 'Прибыль по EUR/USD',
    relatedAccount: 'MT5_001'
  },
  {
    id: 'tx_004',
    date: '2025-08-25T14:20:00Z',
    type: 'withdrawal',
    amount: 2000,
    currency: 'USD',
    status: 'pending',
    description: 'Вывод средств на карту',
    fee: 10
  }
]

// Navigation sections
export const navigationSections: NavigationSection[] = [
  {
    id: 'general',
    label: 'Общее',
    icon: 'person'
  },
  {
    id: 'conversion',
    label: 'Конвертация',
    icon: 'swap_horiz'
  },
  {
    id: 'history',
    label: 'История',
    icon: 'history'
  }
]

// Available currencies for conversion
export const availableCurrencies = [
  { code: 'USD', name: 'Доллар США', symbol: '$' },
  { code: 'EUR', name: 'Евро', symbol: '€' },
  { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
  { code: 'GBP', name: 'Британский фунт', symbol: '£' },
  { code: 'JPY', name: 'Японская йена', symbol: '¥' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ' },
  { code: 'USDT', name: 'Tether', symbol: '₮' }
]

// Transaction types for filtering
export const transactionTypes = [
  { value: 'all', label: 'Все типы' },
  { value: 'deposit', label: 'Пополнения' },
  { value: 'withdrawal', label: 'Выводы' },
  { value: 'conversion', label: 'Конвертации' },
  { value: 'trade', label: 'Торговля' },
  { value: 'transfer', label: 'Переводы' }
]

// Transaction statuses for filtering
export const transactionStatuses = [
  { value: 'all', label: 'Все статусы' },
  { value: 'completed', label: 'Завершенные' },
  { value: 'pending', label: 'В обработке' },
  { value: 'failed', label: 'Отклоненные' },
  { value: 'cancelled', label: 'Отмененные' }
]
