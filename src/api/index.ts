// Экспорт основных сервисов
export { poolsService } from './services/poolsService'

// Экспорт конфигурации
export { 
  apiClient, 
  checkApiHealth, 
  getApiInfo,
  checkWalletConnection,
  getPoolBalance,
  getPoolStatus,
  getPoolDataByAddress,
  testApiEndpoints,
  KNOWN_POOL_ADDRESSES,
  USDT_ADDRESS
} from './config/api.config'

// Экспорт типов
export type {
  PoolData,
  PoolApiData,
  ApiResponse,
  PoolsResponse,
  PoolResponse,
  PoolApiResponse,
  ConnectionStatus,
  PoolUpdateData,
  PoolFilters,
  ApiRequestConfig,
  WalletData,
  PoolStatus,
  PoolBalance
} from './types/pools.types'
