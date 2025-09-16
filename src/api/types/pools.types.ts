/* eslint-disable @typescript-eslint/no-empty-object-type */
// Типы для пулов на основе реального API BitForce
export interface PoolData {
  id: number
  poolNumber: string // pool_xxxxxxxx
  date: string // дата создания (будет добавлена позже в API)
  currentVolume: number // total USDT (из API balance)
  targetAmount: number // целевая сумма (по умолчанию 15000, будет добавлена позже)
  currency: string // валюта (пока только USDT, позже могут быть другие токены)
  status: 'active' | 'inactive' | 'fullfilled' // статусы: active - действительный, inactive - недействительный, fullfilled - заполнен
  poolAddress: string // адрес пула из API
  type?: 'buy' | 'sell' // тип пула (для UI)
}

// Данные пула от API
export interface PoolApiData {
  total: number
  poolAddress: string
}

// Данные от API check-connection
export interface WalletData {
  type: string // тип кошелька (multisig)
  network: string // сеть (nile)
  walletAddress: string // адрес пула
  privateKey: null
  createdAt: null
}

// Статус пула от API pool/status
export interface PoolStatus {
  status: 'active' | 'inactive' | 'fullfilled'
  message: string
}

// Баланс пула от API pool/balance
export interface PoolBalance {
  total: number
  poolAddress: string
}

// API ответы
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PoolsResponse extends ApiResponse<PoolData[]> {}
export interface PoolResponse extends ApiResponse<PoolData> {}
export interface PoolApiResponse extends ApiResponse<PoolApiData> {}
export interface WalletResponse extends ApiResponse<WalletData> {}
export type StatusResponse = ApiResponse<PoolStatus>
export interface BalanceResponse extends ApiResponse<PoolBalance> {}

// Типы для статуса подключения
export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

// Типы для обновления пула
export interface PoolUpdateData {
  id: number
  currentVolume?: number
  status?: 'active' | 'inactive' | 'fullfilled'
}

// Типы для фильтрации пулов
export interface PoolFilters {
  type?: 'buy' | 'sell'
  status?: 'active' | 'inactive' | 'fullfilled'
  currency?: string
  minAmount?: number
  maxAmount?: number
}

// Конфигурация для API запросов
export interface ApiRequestConfig {
  usdtAddress: string // USDT-адрес в сети
  poolAddress: string // адрес пула
  poolId?: string // идентификатор пула (pool_xxxxxxxx)
}
