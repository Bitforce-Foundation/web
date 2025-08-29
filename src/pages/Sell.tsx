import { Link } from 'react-router-dom'
import { useState, useEffect, memo } from 'react'
import Footer from '../components/Footer'
import logo from '../assets/logo2.png'
import { poolsService } from '../api'
import type { PoolData as ApiPoolData, ConnectionStatus } from '../api/types/pools.types'
import './Sell.css'

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

const Sell = memo(() => {
  const [pools, setPools] = useState<UIPoolData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Преобразование API данных в UI формат для продажи
  const convertApiPoolToUI = (apiPool: ApiPoolData): UIPoolData => {
    const progress = Math.min((apiPool.currentVolume / apiPool.targetAmount) * 100, 100)
    
    // Маппинг статусов API -> UI
    let uiStatus: UIPoolData['status'] = 'inactive'
    if (apiPool.status === 'active') uiStatus = 'active'
    else if (apiPool.status === 'fullfilled') uiStatus = 'completed'
    else if (progress > 0 && progress < 100) uiStatus = 'filling'

    return {
      id: `SELL-${apiPool.poolNumber}`,
      poolNumber: apiPool.poolNumber,
      name: apiPool.currency,
      date: apiPool.date,
      rate: 94.80, // Фиксированный курс для продажи (ниже покупки)
      currentVolume: Math.round(apiPool.currentVolume / 94.80), // Конвертируем в USDT
      targetVolume: Math.round(apiPool.targetAmount / 94.80),
      status: uiStatus,
      progress: Math.round(progress),
      currency: apiPool.currency
    }
  }

  // Инициализация и подписка на обновления пулов
  useEffect(() => {
    console.log('[Sell] Инициализация пулов')
    
    // Подписка на обновления пулов
    const unsubscribePools = poolsService.subscribeToPoolsUpdates((apiPools: ApiPoolData[]) => {
      console.log('[Sell] Получены пулы от API:', apiPools)
      
      // Преобразуем API пулы в UI формат
      const uiPools = apiPools.map(convertApiPoolToUI)
      setPools(uiPools)
      setIsLoading(false)
    })

    // Подписка на статус подключения
    const unsubscribeConnection = poolsService.onConnectionStatusChange((status: ConnectionStatus) => {
      console.log('[Sell] Статус подключения:', status)
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
    console.log('[Sell] Обновление пула:', pool.poolNumber)
  }

  const handleAllPoolsRefresh = async () => {
    console.log('[Sell] Обновление всех пулов')
    setIsLoading(true)
    await poolsService.refreshPools()
  }

  const handleParticipate = (pool: UIPoolData) => {
    console.log('[Sell] Участие в пуле:', pool)
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

      <main className="sell-main">
        <div className="sell-container">
          {/* Заголовок как на фото */}
          <div className="sell-header">
            <h1 className="sell-title">Продать USDT</h1>
            <p className="sell-subtitle">Выберите подходящий пул для продажи USDT за рубли</p>
          </div>

          {/* Секция пулов */}
          <div className="sell-pools-section">
            {/* Заголовок секции и статусы */}
            <div className="sell-pools-header">
              <h2 className="sell-pools-title">Активные пулы USDT</h2>
              <div className="sell-pools-actions">
                <button 
                  onClick={handleAllPoolsRefresh}
                  className="sell-refresh-all-btn"
                  disabled={isLoading}
                >
                  <span className="material-icons">refresh</span>
                  Обновить все
                </button>
                <div className="sell-status-legend">
                  <div className="sell-status-item">
                    <div className="sell-status-dot active"></div>
                    <span>Активный</span>
                  </div>
                  <div className="sell-status-item">
                    <div className="sell-status-dot filling"></div>
                    <span>Набирается</span>
                  </div>
                  <div className="sell-status-item">
                    <div className="sell-status-dot completed"></div>
                    <span>Завершен</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Индикатор подключения */}
            <div className={`sell-connection-indicator ${connectionStatus}`}>
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
            <div className="sell-content">
              {/* Список пулов */}
              <div className="sell-pools-list">
                {isLoading ? (
                  <div className="sell-loading">
                    <div className="sell-loading-spinner"></div>
                    <span>Загрузка пулов...</span>
                  </div>
                ) : pools.length === 0 ? (
                  <div className="sell-no-pools">
                    <span className="material-icons">error_outline</span>
                    <h3>Нет доступных пулов</h3>
                    <p>В данный момент нет активных пулов для продажи</p>
                    <button onClick={handleAllPoolsRefresh} className="sell-retry-btn">
                      Попробовать снова
                    </button>
                  </div>
                ) : (
                  pools.map((pool) => (
                    <div key={pool.id} className={`sell-pool-card ${pool.status}`}>
                      <div className="sell-pool-header">
                        <div className="sell-pool-currency">
                          <span className="sell-currency-symbol">{pool.name}</span>
                          <div className="sell-pool-info">
                            <span className="sell-pool-id">#{pool.poolNumber}</span>
                            <span className="sell-pool-date">{pool.date}</span>
                          </div>
                        </div>
                        <div className="sell-pool-actions-header">
                          <div className={`sell-pool-status ${pool.status}`}>
                            {pool.status === 'active' ? 'Активный' :
                             pool.status === 'filling' ? 'Набирается' :
                             pool.status === 'completed' ? 'Завершен' : 'Недоступен'}
                          </div>
                          <button 
                            onClick={() => handlePoolRefresh(pool)}
                            className="sell-pool-refresh-btn"
                            title="Обновить пул"
                          >
                            <span className="material-icons">refresh</span>
                          </button>
                        </div>
                      </div>

                      <div className="sell-pool-details">
                        <div className="sell-detail-item">
                          <span className="sell-detail-label">Курс:</span>
                          <span className="sell-detail-value sell-rate">{pool.rate.toFixed(2)} ₽</span>
                        </div>
                        <div className="sell-detail-item">
                          <span className="sell-detail-label">Объем пула:</span>
                          <span className="sell-detail-value">{pool.currentVolume}/{pool.targetVolume} USDT</span>
                        </div>
                        <div className="sell-detail-item">
                          <span className="sell-detail-label">Цель пула:</span>
                          <span className="sell-detail-value">{(pool.targetVolume * 1000).toLocaleString()} USDT</span>
                        </div>
                      </div>

                      <div className="sell-pool-progress">
                        <div className="sell-progress-bar">
                          <div 
                            className={`sell-progress-fill ${pool.status}`}
                            style={{ width: `${pool.progress}%` }}
                          ></div>
                        </div>
                        <span className="sell-progress-text">{pool.progress}%</span>
                      </div>

                      <button 
                        className={`sell-participate-btn ${pool.status === 'completed' || pool.status === 'inactive' ? 'disabled' : ''}`}
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
              <div className="sell-instructions">
                <div className="sell-info-card">
                  <h3>Как работают пулы?</h3>
                  <ul>
                    <li>✓ Участники объединяют USDT для продажи за рубли</li>
                    <li>✓ Продажа происходит по единому выгодному курсу</li>
                    <li>✓ Снижение комиссий благодаря объему</li>
                    <li>✓ Автоматическое распределение рублей</li>
                  </ul>
                </div>

                <div className="sell-info-card">
                  <h3>Условия продажи</h3>
                  <div className="sell-conditions">
                    <div className="sell-condition-item">
                      <span>Валюта: ₽ за USDT</span>
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

Sell.displayName = 'Sell'

export default Sell