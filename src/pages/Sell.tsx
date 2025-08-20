import { Link } from 'react-router-dom'
import { useState, useMemo, useCallback, memo, useEffect } from 'react'
import Footer from '../components/Footer'
import logo from '../assets/logo2.png'

// Типы для пулов продажи
interface SellPool {
  id: number
  poolNumber: string
  date: string
  rate: number
  currentVolume: number
  maxVolume: number
  targetAmount: number
  currency: string
  status: 'active' | 'filling' | 'completed'
}

const Sell = memo(() => {
  // Функция для генерации случайного числа от 15000 до 50000
  const generateRandomTarget = useCallback(() => {
    return Math.floor(Math.random() * (50000 - 15000 + 1)) + 15000
  }, [])

  // Моковые данные пулов продажи (только USDT за рубли)
  const [pools] = useState<SellPool[]>([
    {
      id: 1,
      poolNumber: 'SELL-2024-001',
      date: '2024-01-15',
      rate: 94.50,
      currentVolume: 8500, // USDT собрано
      maxVolume: 25000, // USDT цель пула
      targetAmount: generateRandomTarget(),
      currency: 'USDT',
      status: 'active'
    },
    {
      id: 2,
      poolNumber: 'SELL-2024-002',
      date: '2024-01-15',
      rate: 94.25,
      currentVolume: 35000, // USDT собрано
      maxVolume: 60000, // USDT цель пула
      targetAmount: generateRandomTarget(),
      currency: 'USDT',
      status: 'filling'
    },
    {
      id: 3,
      poolNumber: 'SELL-2024-003',
      date: '2024-01-15',
      rate: 94.80,
      currentVolume: 15000, // USDT собрано
      maxVolume: 15000, // USDT цель пула
      targetAmount: generateRandomTarget(),
      currency: 'USDT',
      status: 'completed'
    },
    {
      id: 4,
      poolNumber: 'SELL-2024-004',
      date: '2024-01-15',
      rate: 94.40,
      currentVolume: 3200, // USDT собрано
      maxVolume: 120000, // USDT цель пула
      targetAmount: generateRandomTarget(),
      currency: 'USDT',
      status: 'active'
    }
  ])

  const [selectedPool, setSelectedPool] = useState<SellPool | null>(null)
  const [sellAmount, setSellAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [agreedToOffer, setAgreedToOffer] = useState(false)
  const [amountError, setAmountError] = useState('')
  const [offerError, setOfferError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const MIN_POOL_USDT = 15000 // Минимальный объем пула в USDT
  const MIN_PARTICIPATION_USD = 10 // Минимальное участие в USD

  // Расчет минимального количества USDT для продажи
  const getMinAmountUsdt = useCallback(() => {
    return MIN_PARTICIPATION_USD // Минимум $10 = 10 USDT
  }, [])

  const getProgressPercentage = useCallback((current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }, [])

  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'Активный'
      case 'filling': return 'Набирается'
      case 'completed': return 'Завершен'
      default: return 'Неизвестно'
    }
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active': return '#4CAF50'
      case 'filling': return '#FF9800'
      case 'completed': return '#9E9E9E'
      default: return '#9E9E9E'
    }
  }, [])

  const handleParticipate = useCallback((pool: SellPool) => {
    setSelectedPool(pool)
    setShowModal(true)
    setSellAmount('')
    setAgreedToOffer(false)
    setAmountError('')
    setOfferError('')
    // Здесь будет валидация с сервера
    setIsRegistered(Math.random() > 0.5)
  }, [])

  const handleSellAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSellAmount(value)
    
    if (value) {
      const minAmount = getMinAmountUsdt()
      if (parseFloat(value) < minAmount) {
        setAmountError(`Минимальная сумма продажи: ${minAmount} USDT (${MIN_PARTICIPATION_USD}$)`)
      } else {
        setAmountError('')
      }
    }
  }, [getMinAmountUsdt])

  const handleOfferChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToOffer(e.target.checked)
    if (e.target.checked) {
      setOfferError('')
    }
  }, [])

  const calculateReceiveAmount = useMemo(() => {
    if (!selectedPool || !sellAmount) return 0
    return parseFloat(sellAmount) * selectedPool.rate
  }, [selectedPool, sellAmount])

  const isFormValid = useMemo(() => {
    if (!selectedPool || !sellAmount || !agreedToOffer) return false
    const minAmount = getMinAmountUsdt()
    return parseFloat(sellAmount) >= minAmount
  }, [selectedPool, sellAmount, agreedToOffer, getMinAmountUsdt])

  const handleSubmit = useCallback(async () => {
    if (!selectedPool || !sellAmount) return
    
    const minAmount = getMinAmountUsdt()
    if (parseFloat(sellAmount) < minAmount) {
      setAmountError(`Минимальная сумма продажи: ${minAmount} USDT (${MIN_PARTICIPATION_USD}$)`)
      return
    }
    
    if (!agreedToOffer) {
      setOfferError('Необходимо согласиться с офертой')
      return
    }

    setIsLoading(true)
    
    try {
      // Имитация отправки на сервер
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Продажа:', { pool: selectedPool, amount: sellAmount })
      setShowModal(false)
    } catch (error) {
      console.error('Ошибка при продаже:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedPool, sellAmount, agreedToOffer, getMinAmountUsdt])

  const legendItems = useMemo(() => [
    { status: 'active', text: 'Активный' },
    { status: 'filling', text: 'Набирается' },
    { status: 'completed', text: 'Завершен' }
  ], [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Блокируем скролл при открытом меню
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }, [mobileMenuOpen])

  // Функция для закрытия мобильного меню при клике на ссылку
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    document.body.classList.remove('menu-open')
  }, [])

  // Очищаем класс при размонтировании
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [])

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

      <main className="page-main">
        <div className="page-container">
          <div className="page-header">
            <h1 className="page-title">Продать USDT</h1>
            <p className="page-subtitle">Выберите подходящий пул для продажи USDT за рубли</p>
          </div>

          <div className="pools-section">
            <div className="pools-header">
              <h2>Активные пулы продажи USDT</h2>
              <div className="pools-legend">
                {legendItems.map((item) => (
                  <div key={item.status} className="legend-item">
                    <div className={`legend-dot ${item.status}`}></div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pools-grid">
              {pools.map((pool) => {
                const progressPercentage = getProgressPercentage(pool.currentVolume, pool.maxVolume)
                const statusColor = getStatusColor(pool.status)
                const statusText = getStatusText(pool.status)
                const poolSizeUsdt = pool.maxVolume
                const isPoolValid = poolSizeUsdt >= MIN_POOL_USDT
                
                return (
                  <div key={pool.id} className={`pool-card ${pool.status} ${!isPoolValid ? 'invalid' : ''}`}>
                    <div className="pool-header">
                      <div className="pool-currency">
                        <span className="currency-symbol">{pool.currency}</span>
                        <div className="pool-info-header">
                          <span className="pool-number">#{pool.poolNumber}</span>
                          <div className="pool-status" style={{ backgroundColor: statusColor }}>
                            {statusText}
                          </div>
                        </div>
                      </div>
                      <div className="pool-date">{pool.date}</div>
                    </div>

                    <div className="pool-info">
                      <div className="info-item">
                        <span className="info-label">Курс продажи:</span>
                        <span className="info-value rate">{pool.rate.toFixed(2)} ₽</span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">Объем пула:</span>
                        <span className="info-value volume">
                          {pool.currentVolume.toLocaleString()}/{pool.maxVolume.toLocaleString()} USDT
                        </span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">Цель пула:</span>
                        <span className="info-value">
                          {pool.targetAmount.toLocaleString()} USDT
                        </span>
                      </div>

                      <div className="pool-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${progressPercentage}%`,
                              backgroundColor: statusColor
                            }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                    </div>

                    <button 
                      className={`participate-btn ${pool.status === 'completed' || !isPoolValid ? 'disabled' : ''}`}
                      disabled={pool.status === 'completed' || !isPoolValid}
                      onClick={() => handleParticipate(pool)}
                    >
                      {!isPoolValid ? `Мин. ${MIN_POOL_USDT.toLocaleString()} USDT` : pool.status === 'completed' ? 'Завершен' : 'Участвовать'}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="pools-info-sidebar">
              <div className="info-card">
                <h4>Как работают пулы продажи?</h4>
                <ul>
                  <li>✓ Участники объединяют USDT для продажи</li>
                  <li>✓ Продажа происходит по выгодному курсу</li>
                  <li>✓ Снижение комиссий благодаря объему</li>
                  <li>✓ Быстрые выплаты в рублях</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>Условия продажи</h4>
                <div className="commission-info">
                  <div className="commission-item">
                    <span>Валюта:</span>
                    <span>USDT за ₽</span>
                  </div>
                  <div className="commission-item">
                    <span>Мин. участие:</span>
                    <span>${MIN_PARTICIPATION_USD}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно */}
      {showModal && selectedPool && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content responsive-modal" onClick={(e) => e.stopPropagation()}>
            {!isRegistered ? (
              // Окно регистрации
              <div className="registration-modal">
                <div className="modal-header">
                  <h3>Регистрация</h3>
                  <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <p>Для участия в пулах необходимо зарегистрироваться</p>
                  <form className="registration-form">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-input" placeholder="Введите email" />
                    </div>
                    <div className="form-group">
                      <label>Пароль</label>
                      <input type="password" className="form-input" placeholder="Введите пароль" />
                    </div>
                    <div className="form-group">
                      <label>Телефон</label>
                      <input type="tel" className="form-input" placeholder="+7 (999) 123-45-67" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="modal-btn primary" disabled={isLoading}>
                    {isLoading ? <span className="loading-spinner"></span> : 'Зарегистрироваться'}
                  </button>
                  <button className="modal-btn secondary" onClick={() => setShowModal(false)}>
                    Отменить
                  </button>
                </div>
              </div>
            ) : (
              // Окно участия в пуле
              <div className="participation-modal">
                <div className="modal-header">
                  <h3>Продажа {selectedPool.currency}</h3>
                  <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="pool-summary">
                    <div className="summary-item">
                      <span>Курс:</span>
                      <span>{selectedPool.rate.toFixed(2)} ₽</span>
                    </div>
                    <div className="summary-item">
                      <span>Статус:</span>
                      <span>{getStatusText(selectedPool.status)}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Количество для продажи (USDT)</label>
                    <input 
                      type="number" 
                      className={`form-input ${amountError ? 'error' : ''}`}
                      placeholder={`Мин. количество: ${getMinAmountUsdt()} USDT (${MIN_PARTICIPATION_USD}$)`}
                      value={sellAmount}
                      onChange={handleSellAmountChange}
                      step="1"
                      min={getMinAmountUsdt()}
                    />
                    {amountError && <span className="error-message">{amountError}</span>}
                  </div>

                  {sellAmount && parseFloat(sellAmount) >= getMinAmountUsdt() && (
                    <div className="amount-preview">
                      <div className="preview-item">
                        <span>К получению:</span>
                        <span className="amount-value">{calculateReceiveAmount.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  )}

                  <div className="agreement-checkbox">
                    <input 
                      type="checkbox" 
                      id="agreement" 
                      checked={agreedToOffer}
                      onChange={handleOfferChange}
                    />
                    <label htmlFor="agreement">
                      Я согласен с <a href="#" target="_blank">офертой</a> и условиями сделки
                    </label>
                  </div>
                  {offerError && <span className="error-message">{offerError}</span>}
                </div>

                <div className="modal-footer">
                  <button 
                    className={`modal-btn primary ${!isFormValid ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? <span className="loading-spinner"></span> : 'Продать'}
                  </button>
                  <button className="modal-btn secondary" onClick={() => setShowModal(false)} disabled={isLoading}>
                    Отменить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
})

Sell.displayName = 'Sell'

export default Sell 