// Profile page types
export interface ProfileProps {
  className?: string
}

export interface ProfileState {
  activeSection: string
  isMobileNavOpen: boolean
  isLoading: boolean
  error: string | null
}

// User data types
export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  registrationDate: string
  lastLogin: string
  isVerified: boolean
  accountStatus: 'active' | 'suspended' | 'pending'
}

export interface SecuritySettings {
  isTwoFactorEnabled: boolean
  lastPasswordChange: string
  activeSessions: number
  trustedDevices: number
}

// Conversion data types
export interface ConversionData {
  id: string
  date: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  exchangeRate: number
  fee: number
  status: 'completed' | 'pending' | 'failed' | 'cancelled'
  transactionHash?: string
}

export interface ConversionStats {
  totalVolume: number
  totalConversions: number
  averageAmount: number
  popularPairs: Array<{
    pair: string
    count: number
    volume: number
  }>
  totalSavings: number
  currency: string
  period: 'week' | 'month' | 'quarter' | 'year'
}

// History data types
export interface TransactionRecord {
  id: string
  date: string
  type: 'deposit' | 'withdrawal' | 'conversion' | 'trade' | 'transfer'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'cancelled'
  description: string
  fee?: number
  transactionHash?: string
  relatedAccount?: string
}

export interface TransactionFilter {
  dateRange: {
    from: string
    to: string
  }
  transactionType: string
  status: string
  currency: string
  minAmount?: number
  maxAmount?: number
}

// Navigation types
export interface NavigationSection {
  id: string
  label: string
  icon: string
  badge?: string | number
  isDisabled?: boolean
}

// API response types
export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  status: 'success' | 'error'
  message?: string
}

// Hook types
export interface UseProfileData {
  userProfile: UserProfile | null
  securitySettings: SecuritySettings | null
  conversionHistory: ConversionData[]
  conversionStats: ConversionStats | null
  transactionHistory: TransactionRecord[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface UseProfileNavigation {
  activeSection: string
  isMobileNavOpen: boolean
  setActiveSection: (section: string) => void
  toggleMobileNav: () => void
  closeMobileNav: () => void
}

// Form types
export interface ProfileFormData {
  name: string
  email: string
  phone: string
  avatar?: File
}

export interface ConversionFormData {
  fromCurrency: string
  toCurrency: string
  amount: string
}

export type FilterFormData = TransactionFilter
