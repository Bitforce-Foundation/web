/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
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
} from '../config/api.config'
import type { 
  PoolData, 
  PoolsResponse, 
  PoolResponse, 
  ConnectionStatus,
  PoolUpdateData,
  PoolFilters,
  WalletData,
  PoolStatus as ApiPoolStatus,
  PoolBalance
} from '../types/pools.types'

class PoolsService {
  private pools: PoolData[] = []
  private updateCallbacks: ((pools: PoolData[]) => void)[] = []
  private connectionCallbacks: ((status: ConnectionStatus) => void)[] = []
  private isConnected: boolean = false
  private updateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeService()
  }

  /**
   * Инициализация сервиса
   */
  private async initializeService() {
    console.log('[PoolsService] Инициализация')
    
    try {
      const isHealthy = await checkApiHealth()
      this.isConnected = isHealthy
      
      if (isHealthy) {
        console.log('[PoolsService] API доступен')
        this.setConnectionStatus('connected')
        await this.fetchPoolsFromApi()
        this.startAutoUpdate()
      } else {
        console.log('[PoolsService] API недоступен')
        this.setConnectionStatus('disconnected')
      }
    } catch (error) {
      console.error('[PoolsService] Ошибка инициализации:', error)
      this.setConnectionStatus('disconnected')
    }
  }

  /**
   * Загрузка данных пулов из HTTP API
   */
  private async fetchPoolsFromApi() {
    console.log('[PoolsService] Загрузка данных пулов')
    
    try {
      const pools: PoolData[] = []
      
      for (let i = 0; i < KNOWN_POOL_ADDRESSES.length; i++) {
        const poolAddress = KNOWN_POOL_ADDRESSES[i]
        const poolId = i + 1
        const poolNumber = `pool_${Date.now().toString().slice(-8)}_${poolId}`
        
        try {
          const poolData = await getPoolDataByAddress(poolAddress)
          
          if (poolData && poolData.total !== undefined) {
            const pool: PoolData = {
              id: poolId,
              poolNumber,
              date: new Date().toISOString(),
              currentVolume: poolData.total,
              targetAmount: 15000,
              currency: 'USDT',
              status: poolData.status || 'active',
              poolAddress,
              type: i === 0 ? 'buy' : 'sell'
            }
            
            pools.push(pool)
            console.log(`[PoolsService] Пул ${poolNumber}: ${pool.currentVolume} USDT`)
          } else {
            console.log(`[PoolsService] Пул ${poolNumber}: API не вернул данные`)
          }
        } catch (error) {
          console.error(`[PoolsService] Ошибка загрузки пула ${poolNumber}:`, error)
        }
      }
      
      if (pools.length > 0) {
        this.pools = pools
        this.notifyUpdate()
        console.log(`[PoolsService] Загружено ${pools.length} пулов`)
      } else {
        console.log('[PoolsService] API не вернул данные пулов')
      }
      
    } catch (error) {
      console.error('[PoolsService] Ошибка загрузки пулов:', error)
    }
  }



  /**
   * Получение всех пулов через HTTP API
   */
  async fetchPools(filters?: PoolFilters): Promise<PoolData[]> {
    try {
      console.log('[PoolsService] Запрос данных пулов')
      
      if (this.isConnected && this.pools.length === 0) {
        // Если HTTP API доступен, но пулы не загружены, загружаем их
        await this.fetchPoolsFromApi()
      }
      
      return this.pools
    } catch (error) {
      console.error('❌ Ошибка получения пулов через HTTP API:', error)
      return this.pools
    }
  }

  /**
   * Получение пула по ID
   */
  async fetchPoolById(poolId: number): Promise<PoolData | null> {
    try {
      const pool = this.pools.find(p => p.id === poolId)
      return pool || null
    } catch (error) {
      console.error('❌ Ошибка получения пула:', error)
      return null
    }
  }

  /**
   * Обновление данных пула
   */
  async updatePool(poolId: number, updateData: PoolUpdateData): Promise<boolean> {
    try {
      console.log(`[PoolsService] Обновление пула ${poolId}:`, updateData)
      
      const poolIndex = this.pools.findIndex(p => p.id === poolId)
      if (poolIndex === -1) {
        console.error('[PoolsService] Пул не найден:', poolId)
        return false
      }

      // Обновляем данные пула
      this.pools[poolIndex] = {
        ...this.pools[poolIndex],
        ...updateData
      }

      // Уведомляем подписчиков
      this.notifyUpdate()
      
      // TODO: В будущем здесь будет отправка обновления на HTTP API сервер
      // if (this.isConnected) {
      //   await apiClient.patch(`/pools/${poolId}`, updateData)
      // }
      
      return true
    } catch (error) {
      console.error('❌ Ошибка обновления пула:', error)
      return false
    }
  }

  /**
   * Обновление всех пулов
   */
  async refreshPools(): Promise<boolean> {
    try {
      if (this.isConnected) {
        await this.fetchPoolsFromApi()
      } else {
        console.log('[PoolsService] API недоступен')
      }
      
      return true
    } catch (error) {
      console.error('[PoolsService] Ошибка обновления пулов:', error)
      return false
    }
  }

  /**
   * Подписка на обновления пулов
   */
  subscribeToPoolsUpdates(callback: (pools: PoolData[]) => void) {
    this.updateCallbacks.push(callback)
    
    if (this.pools.length > 0) {
      callback([...this.pools])
    }
    
    return () => {
      const index = this.updateCallbacks.indexOf(callback)
      if (index > -1) {
        this.updateCallbacks.splice(index, 1)
      }
    }
  }

  /**
   * Подписка на изменения статуса подключения
   */
  onConnectionStatusChange(callback: (status: ConnectionStatus) => void) {

    
    this.connectionCallbacks.push(callback)
    
    // Сразу отправляем текущий статус
    callback(this.isConnected ? 'connected' : 'error')
    
    return () => {
      const index = this.connectionCallbacks.indexOf(callback)
      if (index > -1) {
        this.connectionCallbacks.splice(index, 1)
      }
    }
  }

  /**
   * Получение статуса подключения к HTTP API
   */
  getConnectionStatus(): ConnectionStatus {
    const status = this.isConnected ? 'connected' : 'error'

    return status
  }

  /**
   * Проверка подключения к HTTP API
   */
  isApiConnected(): boolean {

    return this.isConnected
  }

  /**
   * Тестирование HTTP API (для отладки)
   */
  async testApi(): Promise<void> {
    console.log('[PoolsService] Тестирование API...')
    
    try {
      const health = await checkApiHealth()
      
      if (health) {
        await testApiEndpoints()
        
        const walletData = await checkWalletConnection(KNOWN_POOL_ADDRESSES[0])
        const balanceData = await getPoolBalance(KNOWN_POOL_ADDRESSES[0])
        
        console.log('[PoolsService] Тесты завершены')
      }
    } catch (error) {
      console.error('[PoolsService] Ошибка тестирования:', error)
    }
  }

  /**
   * Запуск автоматического обновления
   */
  private startAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
    
    this.updateInterval = setInterval(() => {
      if (this.isConnected) {
        this.refreshPools()
      }
    }, 60000)
    
    console.log('[PoolsService] Автообновление запущено (60 сек)')
  }

  /**
   * Остановка автоматического обновления
   */
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
      console.log('[PoolsService] Автообновление остановлено')
    }
  }

  /**
   * Уведомление подписчиков об обновлении
   */
  private notifyUpdate() {

    this.updateCallbacks.forEach(callback => callback([...this.pools]))
  }

  /**
   * Установка статуса подключения
   */
  private setConnectionStatus(status: ConnectionStatus) {

    this.connectionCallbacks.forEach(callback => callback(status))
  }

  /**
   * Получение текущих пулов
   */
  getCurrentPools(): PoolData[] {

    return [...this.pools]
  }

  /**
   * Получение пулов по типу
   */
  getPoolsByType(type: 'buy' | 'sell'): PoolData[] {
    return this.pools.filter(pool => pool.type === type)
  }

  /**
   * Получение пулов по статусу
   */
  getPoolsByStatus(status: 'active' | 'inactive' | 'fullfilled'): PoolData[] {
    return this.pools.filter(pool => pool.status === status)
  }

  /**
   * Очистка ресурсов
   */
  disconnect() {
    console.log('[PoolsService] Отключение')
    this.stopAutoUpdate()
    this.updateCallbacks = []
    this.connectionCallbacks = []
  }
}

export const poolsService = new PoolsService()

// Экспортируем метод testApi для отладки в консоли браузера
export const testApi = () => poolsService.testApi()
