import axios from 'axios'

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://bitforce-api.ru',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
}

console.log('[API Config] Base URL:', API_CONFIG.baseURL)
console.log('[API Config] Environment VITE_API_URL:', import.meta.env.VITE_API_URL)

export const apiClient = axios.create(API_CONFIG)

// Логирование запросов
apiClient.interceptors.request.use(
  (config) => {
    console.log('[API Request]', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// Логирование ответов
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('[API Response Error]', error.response?.status, error.config?.url, error.message)
    return Promise.reject(error)
  }
)

export const API_ENDPOINTS = {
  ROOT: '/',
  HEALTH: '/health',
  DOCS: '/docs',
  // Эндпоинты для работы с кошельками
  WALLET_CHECK_CONNECTION: '/wallet/check-connection',
  WALLET_TRX_BALANCE: '/wallet/trx-balance',
  // Эндпоинты для работы с пулами
  POOL_STATUS: '/pool/status',
  POOL_BALANCE: '/pool/balance',
  // Эндпоинт для транзакций
  TRANSACTION_DATA: '/transaction/data'
}

export const USDT_ADDRESS = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf'
export const KNOWN_POOL_ADDRESSES = [
  'TLQqdGTSa1CKmK8X8fwFTm7A9AqRXPJXzh', // pool_1 (399 USDT)
  'TWqdGhMspmzDdangbYqG6KxN1Ro2msEFwz'  // pool_2 (7329 USDT)
]

/**
 * Проверка здоровья API
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    console.log('[API] Проверяем здоровье API по адресу:', `${API_CONFIG.baseURL}${API_ENDPOINTS.HEALTH}`)
    const response = await apiClient.get(API_ENDPOINTS.HEALTH)
    console.log('[API] Health check успешен:', response.status, response.data)
    return response.status === 200
  } catch (error) {
    console.error('[API] Health check failed:', error)
    if (error.response) {
      console.error('[API] Response error:', error.response.status, error.response.data)
    }
    return false
  }
}

/**
 * Получение информации об API
 */
export const getApiInfo = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.ROOT)
    return response.data
  } catch (error) {
    console.warn('[API] Failed to get API info:', error)
    return null
  }
}





/**
 * Проверка подключения кошелька
 */
export const checkWalletConnection = async (poolAddress: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.WALLET_CHECK_CONNECTION, {
      wallet_address: poolAddress
    })
    return response.data
  } catch (error) {
    console.error('[API] Wallet connection failed:', error.response?.status || 'error')
    return null
  }
}

/**
 * Получение баланса пула
 */
export const getPoolBalance = async (poolAddress: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.POOL_BALANCE, {
      usdt_address: USDT_ADDRESS,
      wallet_address: poolAddress
    })
    return response.data
  } catch (error) {
    console.error('[API] Pool balance failed:', error.response?.status || 'error')
    return null
  }
}

/**
 * Получение статуса пула
 */
export const getPoolStatus = async (poolAddress: string, poolId: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.POOL_STATUS, {
      usdt_address: USDT_ADDRESS,
      wallet_address: poolAddress,
      pool_id: poolId
    })
    return response.data
  } catch (error) {
    console.error('[API] Pool status failed:', error.response?.status || 'error')
    return null
  }
}

/**
 * Получение данных конкретного пула по адресу
 */
export const getPoolDataByAddress = async (poolAddress: string) => {
  try {
    // Проверяем подключение кошелька
    const walletData = await checkWalletConnection(poolAddress)
    if (!walletData) {
      return null
    }
    
    // Получаем баланс пула
    const balanceData = await getPoolBalance(poolAddress)
    if (!balanceData) {
      return null
    }
    
    // Получаем статус пула
    const poolId = `pool_${Date.now().toString().slice(-8)}`
    const statusData = await getPoolStatus(poolAddress, poolId)
    
    return {
      total: balanceData.data?.total || 0,
      poolAddress,
      status: statusData?.data?.status || 'active',
      poolId
    }
    
  } catch (error) {
    console.error('[API] Pool data failed:', error.response?.status || 'error')
    return null
  }
}



/**
 * Тестирование API эндпоинтов
 */
export const testApiEndpoints = async () => {
  try {
    await apiClient.post(API_ENDPOINTS.WALLET_CHECK_CONNECTION, {
      wallet_address: KNOWN_POOL_ADDRESSES[0]
    })
    await apiClient.post(API_ENDPOINTS.POOL_BALANCE, {
      usdt_address: USDT_ADDRESS,
      wallet_address: KNOWN_POOL_ADDRESSES[0]
    })
    await apiClient.post(API_ENDPOINTS.POOL_STATUS, {
      usdt_address: USDT_ADDRESS,
      wallet_address: KNOWN_POOL_ADDRESSES[0],
      pool_id: 'test_pool'
    })
    console.log('[API] API доступен')
  } catch (error) {
    console.log('[API] API недоступен:', error.response?.status || 'error')
  }
} 
