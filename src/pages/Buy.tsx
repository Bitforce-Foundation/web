import { Link } from 'react-router-dom'
import { useState, useEffect, memo } from 'react'
import Footer from '../components/Footer'
import logo from '../assets/logo2.png'
import { poolsService } from '../api'
import type { PoolData as ApiPoolData, ConnectionStatus } from '../api/types/pools.types'
import './Buy.css'

// Адаптированная структура пула для UI
interface UIPoolData {
  id: string
  poolNumber: string
  name: string
  date: string
  rate: number
  currentVolume: number
  targetVolume: number
  status: 'active' | 'filling' | 'completed' | 'inactive'
  progress: number
  currency: string
}

const Buy = memo(() => {
  const [pools, setPools] = useState<UIPoolData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting')
  const [selectedPool, setSelectedPool] = useState<UIPoolData | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Преобразование API данных в UI формат
  const convertApiPoolToUI = (apiPool: ApiPoolData): UIPoolData => {
    const progress = Math.min((apiPool.currentVolume / apiPool.targetAmount) * 100, 100)
    
    // Маппинг статусов API -> UI
    let uiStatus: UIPoolData['status'] = 'inactive'
    if (apiPool.status === 'active') uiStatus = 'active'
    else if (apiPool.status === 'fullfilled') uiStatus = 'completed'
    else if (progress > 0 && progress < 100) uiStatus = 'filling'

    return {
      id: `BUY-${apiPool.poolNumber}`,
      poolNumber: apiPool.poolNumber,
      name: apiPool.currency,
      date: apiPool.date,
      rate: 95.50, // Фиксированный курс для покупки
      currentVolume: Math.round(apiPool.currentVolume / 95.50), // Конвертируем в USDT
      targetVolume: Math.round(apiPool.targetAmount / 95.50),
      status: uiStatus,
      progress: Math.round(progress),
      currency: apiPool.currency
    }
  }

  // Инициализация и подписка на обновления пулов
  useEffect(() => {
    console.log('[Buy] Инициализация пулов')
    
    // Подписка на обновления пулов
    const unsubscribePools = poolsService.subscribeToPoolsUpdates((apiPools: ApiPoolData[]) => {
      console.log('[Buy] Получены пулы от API:', apiPools)
      
      // Преобразуем API пулы в UI формат
      const uiPools = apiPools.map(convertApiPoolToUI)
      
      // Добавляем моковые пулы если API не вернул данные
      if (uiPools.length === 0) {
        const mockPools: UIPoolData[] = [
          {
            id: 'BUY-2024-001',
            poolNumber: 'pool_06505339',
            name: 'USDT',
            date: '2024-01-15',
            rate: 95.50,
            currentVolume: 89,
            targetVolume: 262,
            status: 'active',
            progress: 34,
            currency: 'USDT'
          },
          {
            id: 'BUY-2024-002',
            poolNumber: 'pool_91513851',
            name: 'USDT',
            date: '2024-01-15',
            rate: 95.25,
            currentVolume: 156,
            targetVolume: 300,
            status: 'filling',
            progress: 52,
            currency: 'USDT'
          },
          {
            id: 'BUY-2024-003',
            poolNumber: 'pool_12345678',
            name: 'USDT',
            date: '2024-01-14',
            rate: 95.80,
            currentVolume: 200,
            targetVolume: 200,
            status: 'completed',
            progress: 100,
            currency: 'USDT'
          }
        ]
        setPools(mockPools)
      } else {
        setPools(uiPools)
      }
      
      setIsLoading(false)
    })

    // Подписка на статус подключения
    const unsubscribeConnection = poolsService.onConnectionStatusChange((status: ConnectionStatus) => {
      console.log('[Buy] Статус подключения:', status)
      setConnectionStatus(status)
    })

    // Получаем начальные данные
    const initialPools = poolsService.getCurrentPools()
    if (initialPools.length > 0) {
      const uiPools = initialPools.map(convertApiPoolToUI)
      setPools(uiPools)
      setIsLoading(false)
    }

    return () => {
      unsubscribePools()
      unsubscribeConnection()
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.classList.remove('menu-open')
  }

  const handlePoolRefresh = async (pool: UIPoolData) => {
    console.log('[Buy] Обновление пула:', pool.poolNumber)
    // Можно добавить индивидуальное обновление пула
  }

  const handleAllPoolsRefresh = async () => {
    console.log('[Buy] Обновление всех пулов')
    setIsLoading(true)
    await poolsService.refreshPools()
  }

  const handleParticipate = (pool: UIPoolData) => {
    setSelectedPool(pool)
    console.log('[Buy] Участие в пуле:', pool)
    // Здесь будет логика участия в пуле
  }

  return (
    <div className="app-root">
      <header className="header">
        <div className="header__logo-menu">
          <Link to="/">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
          <nav className={`header__nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" onClick={closeMobileMenu}>Главная</Link>
            <Link to="/buy" onClick={closeMobileMenu}>Купить</Link>
            <Link to="/sell" onClick={closeMobileMenu}>Продать</Link>
            <a href="#services" onClick={closeMobileMenu}>Услуги</a>
            <a href="#about" onClick={closeMobileMenu}>О нас</a>
            <a href="#conversion" onClick={closeMobileMenu}>Конвертация</a>
          </nav>
        </div>
        <div className="header__actions">
          <a href="#login" className="header__login">Войти</a>
          <div 
            className={`header__burger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main className="buy-main">
        <div className="buy-container">
          {/* Заголовок как на фото */}
          <div className="buy-header">
            <h1 className="buy-title">Купить USDT</h1>
            <p className="buy-subtitle">Выберите подходящий пул для покупки USDT за рубли</p>
          </div>

          {/* Секция пулов */}
          <div className="buy-pools-section">
            {/* Заголовок секции и статусы */}
            <div className="buy-pools-header">
              <h2 className="buy-pools-title">Активные пулы USDT</h2>
              <div className="buy-pools-actions">
                <button 
                  onClick={handleAllPoolsRefresh}
                  className="buy-refresh-all-btn"
                  disabled={isLoading}
                >
                  <span className="material-icons">refresh</span>
                  Обновить все
                </button>
                <div className="buy-status-legend">
                  <div className="buy-status-item">
                    <div className="buy-status-dot active"></div>
                    <span>Активный</span>
                  </div>
                  <div className="buy-status-item">
                    <div className="buy-status-dot filling"></div>
                    <span>Набирается</span>
                  </div>
                  <div className="buy-status-item">
                    <div className="buy-status-dot completed"></div>
                    <span>Завершен</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Индикатор подключения */}
            <div className={`buy-connection-indicator ${connectionStatus}`}>
              <span className="material-icons">
                {connectionStatus === 'connected' ? 'wifi' : 
                 connectionStatus === 'connecting' ? 'wifi_off' : 'error'}
              </span>
              <span>
                {connectionStatus === 'connected' ? 'Подключено к API' :
                 connectionStatus === 'connecting' ? 'Подключение...' : 'Ошибка подключения'}
              </span>
            </div>

            {/* Основной контент: пулы слева, инструкции справа */}
            <div className="buy-content">
              {/* Список пулов */}
              <div className="buy-pools-list">
                {isLoading ? (
                  <div className="buy-loading">
                    <div className="buy-loading-spinner"></div>
                    <span>Загрузка пулов...</span>
                  </div>
                ) : pools.length === 0 ? (
                  <div className="buy-no-pools">
                    <span className="material-icons">error_outline</span>
                    <h3>Нет доступных пулов</h3>
                    <p>В данный момент нет активных пулов для покупки</p>
                    <button onClick={handleAllPoolsRefresh} className="buy-retry-btn">
                      Попробовать снова
                    </button>
                  </div>
                ) : (
                  pools.map((pool) => (
                    <div key={pool.id} className={`buy-pool-card ${pool.status}`}>
                      <div className="buy-pool-header">
                        <div className="buy-pool-currency">
                          <span className="buy-currency-symbol">{pool.name}</span>
                          <div className="buy-pool-info">
                            <span className="buy-pool-id">#{pool.poolNumber}</span>
                            <span className="buy-pool-date">{pool.date}</span>
                          </div>
                        </div>
                        <div className="buy-pool-actions-header">
                          <div className={`buy-pool-status ${pool.status}`}>
                            {pool.status === 'active' ? 'Активный' :
                             pool.status === 'filling' ? 'Набирается' :
                             pool.status === 'completed' ? 'Завершен' : 'Недоступен'}
                          </div>
                          <button 
                            onClick={() => handlePoolRefresh(pool)}
                            className="buy-pool-refresh-btn"
                            title="Обновить пул"
                          >
                            <span className="material-icons">refresh</span>
                          </button>
                        </div>
                      </div>

                      <div className="buy-pool-details">
                        <div className="buy-detail-item">
                          <span className="buy-detail-label">Курс:</span>
                          <span className="buy-detail-value buy-rate">{pool.rate.toFixed(2)} ₽</span>
                        </div>
                        <div className="buy-detail-item">
                          <span className="buy-detail-label">Объем пула:</span>
                          <span className="buy-detail-value">{pool.currentVolume}/{pool.targetVolume} USDT</span>
                        </div>
                        <div className="buy-detail-item">
                          <span className="buy-detail-label">Цель пула:</span>
                          <span className="buy-detail-value">{(pool.targetVolume * 1000).toLocaleString()} USDT</span>
                        </div>
                      </div>

                      <div className="buy-pool-progress">
                        <div className="buy-progress-bar">
                          <div 
                            className={`buy-progress-fill ${pool.status}`}
                            style={{ width: `${pool.progress}%` }}
                          ></div>
                        </div>
                        <span className="buy-progress-text">{pool.progress}%</span>
                      </div>

                      <button 
                        className={`buy-participate-btn ${pool.status === 'completed' || pool.status === 'inactive' ? 'disabled' : ''}`}
                        disabled={pool.status === 'completed' || pool.status === 'inactive'}
                        onClick={() => handleParticipate(pool)}
                      >
                        {pool.status === 'completed' ? 'Завершен' : 
                         pool.status === 'inactive' ? 'Недоступен' : 'Участвовать'}
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Инструкции справа */}
              <div className="buy-instructions">
                <div className="buy-info-card">
                  <h3>Как работают пулы?</h3>
                  <ul>
                    <li>✓ Участники объединяют рубли для покупки USDT</li>
                    <li>✓ Покупка происходит по единому выгодному курсу</li>
                    <li>✓ Снижение комиссий благодаря объему</li>
                    <li>✓ Автоматическое распределение USDT</li>
                  </ul>
                </div>

                <div className="buy-info-card">
                  <h3>Условия покупки</h3>
                  <div className="buy-conditions">
                    <div className="buy-condition-item">
                      <span>Валюта: USDT за ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
})

Buy.displayName = 'Buy'

export default Buy 