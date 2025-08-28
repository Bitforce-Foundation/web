import type { ReactNode } from 'react'

// General Section Types
export interface GeneralSectionProps {
  className?: string
}

export interface UserInfoProps {
  name: string
  email: string
  phone: string
  registrationDate: string
  lastLogin: string
  avatar?: string
  className?: string
}

export interface SecuritySettingsProps {
  isTwoFactorEnabled: boolean
  lastPasswordChange: string
  onToggleTwoFactor: () => void
  onChangePassword: () => void
  className?: string
}

// Prop Trading Section Types
export interface PropTradingProps {
  className?: string
}

export interface TradingAccountProps {
  accountId: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  currency: string
  className?: string
}

export interface TradingStatsProps {
  totalTrades: number
  winRate: number
  profitFactor: number
  maxDrawdown: number
  totalProfit: number
  currency: string
  className?: string
}

// Conversion Section Types
export interface ConversionSectionProps {
  className?: string
}

export interface ConversionFormProps {
  fromCurrency: string
  toCurrency: string
  amount: string
  onFromCurrencyChange: (currency: string) => void
  onToCurrencyChange: (currency: string) => void
  onAmountChange: (amount: string) => void
  onSubmit: () => void
  isLoading?: boolean
  exchangeRate?: number
  className?: string
}

export interface ConversionHistoryProps {
  conversions: ConversionRecord[]
  isLoading?: boolean
  className?: string
}

export interface ConversionRecord {
  id: string
  date: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  exchangeRate: number
  status: 'completed' | 'pending' | 'failed'
}

// History Section Types
export interface HistorySectionProps {
  className?: string
}

export interface TransactionHistoryProps {
  transactions: Transaction[]
  isLoading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  className?: string
}

export interface Transaction {
  id: string
  date: string
  type: 'deposit' | 'withdrawal' | 'conversion' | 'trade'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  description: string
}

export interface FilterProps {
  dateRange: [string, string]
  transactionType: string
  status: string
  onDateRangeChange: (range: [string, string]) => void
  onTransactionTypeChange: (type: string) => void
  onStatusChange: (status: string) => void
  onReset: () => void
  className?: string
}

// Common Section Props
export interface SectionProps {
  title: string
  children: ReactNode
  className?: string
  actions?: ReactNode
}
