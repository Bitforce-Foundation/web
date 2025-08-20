import { useState, useMemo, useCallback, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import logo from '../assets/logo2.png'
import mainlogo from '../assets/mainlogo.png'
import leadImage from '../assets/lead.png'

const Home = memo(() => {
  const [activeOption, setActiveOption] = useState<number | null>(0)

  const [showTradingDescription, setShowTradingDescription] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('buy')
  const [selectedPool, setSelectedPool] = useState('main')
  const [poolType, setPoolType] = useState('active')

  const handleOptionClick = useCallback((index: number) => {
    setActiveOption(prev => prev === index ? null : index)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
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

  const toggleTradingDescription = useCallback(() => {
    setShowTradingDescription(prev => !prev)
  }, [])

  const handleActionChange = useCallback((action: string) => {
    setSelectedAction(action)
  }, [])

  const handlePoolChange = useCallback((pool: string) => {
    setSelectedPool(pool)
  }, [])

  const handlePoolTypeChange = useCallback((type: string) => {
    setPoolType(type)
  }, [])

  // Данные активных пулов
  const activePools = useMemo(() => ({
    main: {
      id: 'MAIN-2024-001',
      date: '2024-01-15',
      buyRate: 94.20,
      sellRate: 93.80,
      currentVolume: 8500,
      maxVolume: 25000,
      status: 'active',
      statusColor: '#22c55e'
    },
    reserve: {
      id: 'RESERVE-2024-001', 
      date: '2024-01-15',
      buyRate: 94.00,
      sellRate: 93.60,
      currentVolume: 12000,
      maxVolume: 20000,
      status: 'filling',
      statusColor: '#f59e0b'
    }
  }), [])

  // Данные завершенных пулов
  const completedPools = useMemo(() => ({
    main: {
      id: 'MAIN-2024-002',
      date: '2024-01-10',
      buyRate: 93.85,
      sellRate: 93.45,
      currentVolume: 30000,
      maxVolume: 30000,
      status: 'completed',
      statusColor: '#64748b'
    },
    reserve: {
      id: 'RESERVE-2024-002',
      date: '2024-01-08', 
      buyRate: 93.60,
      sellRate: 93.20,
      currentVolume: 15000,
      maxVolume: 15000,
      status: 'completed',
      statusColor: '#64748b'
    }
  }), [])

  // Выбираем текущие пулы в зависимости от типа
  const currentPools = poolType === 'active' ? activePools : completedPools
  const currentPool = currentPools[selectedPool as keyof typeof currentPools]

  const conversionSectionClass = useMemo(() => {
    return `conversion-section ${activeOption !== null ? 'with-expanded-content' : ''}`
  }, [activeOption])

  const optionItems = useMemo(() => [
    { id: 0, text: 'Торговля сразу' },
    { id: 1, text: 'Торговля в 1 этап' },
    { id: 2, text: 'Торговля в 2 этапа' }
  ], [])

  const stepColumns = useMemo(() => [
    [
      { number: 1, title: 'Регистрация', description: 'Создайте аккаунт и пройдите верификацию' },
      { number: 2, title: 'Выбор суммы', description: 'Определите количество для обмена' },
      { number: 3, title: 'Перевод средств', description: 'Отправьте активы в общий пул' }
    ],
    [
      { number: 4, title: 'Ожидание группы', description: 'Дождитесь формирования группы' },
      { number: 5, title: 'Обработка заявки', description: 'Автоматическая обработка операции' },
      { number: 6, title: 'Получение средств', description: 'Получите конвертированные активы' }
    ]
  ], [])

  return (
    <div className="app-root">
      <header className="header">
        <div className="header__logo-menu">
          <Link to="/">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
          <nav className={`header__nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/buy" onClick={closeMobileMenu}>Купить</Link>
            <Link to="/sell" onClick={closeMobileMenu}>Продать</Link>
            <a href="#services" onClick={closeMobileMenu}>Услуги</a>
            <a href="#about" onClick={closeMobileMenu}>О нас</a>
            <a href="#conversion" onClick={closeMobileMenu}>Конвертация</a>
          </nav>
        </div>
        <div className="header__actions">
          <Link to="/profile" className="header__profile-button">
            Личный кабинет
          </Link>
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

      <main className="hero">
        <div className="hero__content">
          <div className="hero__text-section">
            <div className="hero__main-text">
              <h1 className="hero__main-title">Ваш <span className="accent-partner">надежный партнер</span><br />в мире инвестиций<br />и цифровых активов</h1>
            </div>
            <div className="hero__logo-section">
              <div className="hero__main-logo">
                <img src={mainlogo} alt="BitForce" className="hero__main-logo-img" />
                <img src={logo} alt="BitForce Logo2" className="hero__logo2-img" />
              </div>
              <p className="hero__subtitle">
                <span className="accent-first">Первый в России</span> хедж-фонд цифровых активов<br />
                с офлайн офисом<br /><br />
              </p>
            </div>
          </div>
        </div>
      </main>

      <section id="services" className="trading-section">
        <div className="trading-container">
          <button 
            className="trading-btn"
            onClick={toggleTradingDescription}
          >
            Проприетарный трейдинг
            <span className="arrow-down">▼</span>
          </button>
          
          {showTradingDescription && (
            <div className="trading-description">
              <p>Проприетарный трейдинг — это торговля на финансовых рынках, где трейдер получает возможность использовать капитал компании для совершения сделок, получая часть прибыли</p>
            </div>
          )}
          
          <div className="info-banner">
            <div className="info-icon">ℹ️</div>
            <p>Вам будет предоставлен субсчет, в зависимости от купленного плана. Также трейдер должен соблюдать лимиты убытков: не более 5% от депозита за весь период и 3% дневной просадки, и нарушать правила платформы Bybit или законы РФ</p>
          </div>
          
          <div className="trading-options active">
            <div className="options-row">
              {optionItems.map((item) => (
                <div 
                  key={item.id}
                  className={`option-item ${activeOption === item.id ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(item.id)}
                >
                  <span>{item.text}</span>
                  <span className="option-arrow">→</span>
                </div>
              ))}
            </div>
            
            <div className="options-container">
              <div className="option-info">
                <div className={`info-content ${activeOption === 0 ? 'active' : ''}`}>
                  <h3>Торговля сразу</h3>
                  <p>Моментальный доступ к торговле с полным функционалом. Идеально для опытных трейдеров.</p>
                  <div className="trading-details">
                    <div className="detail-item">
                      <span className="detail-label">Максимальный убыток:</span>
                      <span className="detail-value">5%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Проходное значение:</span>
                      <span className="detail-value">8%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Стоимость:</span>
                      <span className="detail-value price">8000₽</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Торговый депозит:</span>
                      <span className="detail-value">1000$</span>
                    </div>
                  </div>
                  <button className="purchase-btn">Приобрести</button>
                </div>
              
                <div className={`info-content ${activeOption === 1 ? 'active' : ''}`}>
                  <h3>Торговля в 1 этап</h3>
                  <p>Одноэтапная верификация с базовыми возможностями торговли.</p>
                </div>
              
                <div className={`info-content ${activeOption === 2 ? 'active' : ''}`}>
                  <h3>Торговля в 2 этапа</h3>
                  <p>Двухэтапная верификация с расширенными возможностями и повышенными лимитами.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="conversion" className={conversionSectionClass}>
        <div className="conversion-container">
          <h2>Конвертация</h2>
          <p className="conversion-description">
            Наша компания обеспечивает безопасную конвертацию цифровых активов через объединение участников в группы, снижая риски P2P-обмена. Вы пополняете «общий банк», а мы выступаем гарантом. Мы не взаимодействуем с ненадежными сторонами, делая обмен безопасным и прозрачным.
          </p>
          
          <h3 className="steps-title">Шаги обмена и участия в пуле</h3>
          
          <div className="steps-grid">
            {stepColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="steps-column">
                {column.map((step) => (
                  <div key={step.number} className="step-card">
                    <div className="step-number">{step.number}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кнопки Купить/Продать со слайдером пулов */}
      <section className="trading-buttons-section">
        <div className="trading-buttons-container">
          <div className="trading-button-wrapper">
            <div className="trading-main-btn buy-btn" onClick={() => handleActionChange('buy')}>
              <div className="btn-content">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0L16 8H12V16H4V8H0L8 0Z"/>
                </svg>
                <span>Купить</span>
              </div>
            </div>
            
            <div className="trading-main-btn sell-btn" onClick={() => handleActionChange('sell')}>
              <div className="btn-content">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 16L0 8H4V0H12V8H16L8 16Z"/>
                </svg>
                <span>Продать</span>
              </div>
            </div>
          </div>
          
          {/* Слайдер пулов под кнопками */}
          <div className="pools-slider">
            <div className="pools-slider-header">
              <h3>Выберите пул для {selectedAction === 'buy' ? 'покупки' : 'продажи'}</h3>
              <div className="pool-controls">
                <div className="pool-type-toggle">
                  <button 
                    className={`pool-type-btn ${poolType === 'active' ? 'active' : ''}`}
                    onClick={() => handlePoolTypeChange('active')}
                  >
                    Активные
                  </button>
                  <button 
                    className={`pool-type-btn ${poolType === 'completed' ? 'active' : ''}`}
                    onClick={() => handlePoolTypeChange('completed')}
                  >
                    Завершенные
                  </button>
                </div>
                <div className="pool-toggle">
                  <button 
                    className={`pool-toggle-btn ${selectedPool === 'main' ? 'active' : ''}`}
                    onClick={() => handlePoolChange('main')}
                  >
                    Основной
                  </button>
                  <button 
                    className={`pool-toggle-btn ${selectedPool === 'reserve' ? 'active' : ''}`}
                    onClick={() => handlePoolChange('reserve')}
                  >
                    Резервный
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pools-grid">
              <div className={`pool-card ${currentPool.status}`}>
                <div className="pool-header">
                  <div className="pool-currency">
                    <span className="currency-symbol">USDT</span>
                    <div className="pool-info-header">
                      <span className="pool-number">#{currentPool.id}</span>
                      <div className="pool-status" style={{ backgroundColor: currentPool.statusColor }}>
                        {currentPool.status === 'active' ? 'Активный' : 
                         currentPool.status === 'filling' ? 'Набирается' : 
                         currentPool.status === 'completed' ? 'Завершен' : 'Резервный'}
                      </div>
                    </div>
                  </div>
                  <div className="pool-date">{currentPool.date}</div>
                </div>

                <div className="pool-info">
                  <div className="info-item">
                    <span className="info-label">Курс {selectedAction === 'buy' ? 'покупки' : 'продажи'}:</span>
                    <span className="info-value rate">
                      {selectedAction === 'buy' ? currentPool.buyRate.toFixed(2) : currentPool.sellRate.toFixed(2)} ₽
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Объем пула:</span>
                    <span className="info-value volume">
                      {currentPool.currentVolume.toLocaleString()}/{currentPool.maxVolume.toLocaleString()} USDT
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Цель пула:</span>
                    <span className="info-value">
                      {currentPool.maxVolume.toLocaleString()} USDT
                    </span>
                  </div>

                  <div className="pool-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${Math.round((currentPool.currentVolume / currentPool.maxVolume) * 100)}%`,
                          backgroundColor: currentPool.statusColor
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {Math.round((currentPool.currentVolume / currentPool.maxVolume) * 100)}%
                    </span>
                  </div>
                </div>

                {poolType === 'active' ? (
                  <Link to={`/${selectedAction}`} className="participate-btn">
                    {selectedAction === 'buy' ? 'Купить' : 'Продать'}
                  </Link>
                ) : (
                  <button className="participate-btn disabled" disabled>
                    Завершен
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Раздел О нас */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">О нас</h2>
          <p className="about-description">
            BitForce — первый в России хедж-фонд цифровых активов с офлайн офисом в Санкт-Петербурге. 
            Мы не только предлагаем инновационные решения для инвестирования в цифровые активы, но и помогаем 
            безопасно и выгодно конвертировать цифровые активы, выступая гарантом каждой сделки.
          </p>
          
          <div className="about-content">
            <div className="about-features">
              <div className="feature-card">
                <h4>Профессиональная команда</h4>
                <p>Эксперты с многолетним опытом в финансах и инвестициях</p>
              </div>
              <div className="feature-card">
                <h4>Прозрачность</h4>
                <p>Мы обеспечиваем ясность и безопасность в каждом шаге нашего сотрудничества</p>
              </div>
              <div className="feature-card">
                <h4>Качественный подход</h4>
                <p>Персонализированные стратегии, учитывающие ваши цели и уровень риска</p>
              </div>
            </div>
            
            <div className="about-image">
              <img src={leadImage} alt="BitForce Team" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
})

Home.displayName = 'Home'

export default Home 