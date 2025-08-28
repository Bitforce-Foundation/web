import { useState, useMemo, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import logo from '../assets/logo2.png'
import mainlogo from '../assets/mainlogo.png'
import leadImage from '../assets/lead.png'

const Home = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const handleActionChange = useCallback((action: string) => {
    setSelectedAction(action)
  }, [])

  const stepColumns = useMemo(() => [
    [
      { number: 1, title: 'Регистрация', description: 'Создайте аккаунт и пройдите верификацию' },
      { number: 2, title: 'Покупка/продажа', description: 'Определите, что вы хотите, купить или продать криптовалюту' },
      { number: 3, title: 'Укажите сумму', description: 'Сумма для обмена, в рублях' }
    ],
    [
      { number: 4, title: 'Фиксация курса', description: 'На момент активной сделки, курс фиксируется' },
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
            <Link to="/buy">Купить</Link>
            <Link to="/sell">Продать</Link>
            <a href="#services">Услуги</a>
            <a href="#about">О нас</a>
            <a href="#conversion">Конвертация</a>
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
              <h1 className="hero__main-title">Ваш <span className="accent-partner">надежный партнер</span><br />в мире<br />цифровых активов</h1>
            </div>
            <div className="hero__logo-section">
                <div className="hero__main-logo">
                <img src={mainlogo} alt="BitForce" className="hero__main-logo-img" />
                <img src={logo} alt="BitForce Logo2" className="hero__logo2-img" />
                </div>
                <p className="hero__subtitle">
                <span className="accent-first">Первый в России</span> хедж-фонд <br /><span className="center-text">цифровых активов</span><br /> <br /><br />
                </p>
            </div>
          </div>
        </div>
      </main>

      <section id="services" className="trading-section">
        <div className="trading-container">
          <div className="coming-soon-card">
            <h3>Проприетарный трейдинг</h3>
            <p>Скоро</p>
          </div>
        </div>
      </section>
      
      <section id="conversion" className="conversion-section">
        <div className="conversion-container">
          <h2>Конвертация</h2>
          <p className="conversion-description">
            Наша компания обеспечивает безопасную конвертацию цифровых активов, снижая риски P2P-обмена. Мы являемся агентом по покупке/продаже криптовалюты. Не взаимодействуем с ненадежными сторонами, делая обмен безопасным и прозрачным, предоставляя всю соответствующую документацию.
          </p>
          
          <h3 className="steps-title">Процесс конвертации</h3>
          
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
        </div>
      </section>

      {/* Раздел О нас */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">О нас</h2>
          <p className="about-description">
            BitForce — первый в России хедж-фонд цифровых активов в Санкт-Петербурге. 
            Мы предлагаем инновационные решения для инвестирования в цифровые активы, но и помогаем 
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

function setSelectedAction(action: string) {
  if (action === 'buy') {
    window.location.href = '/buy'
  } else if (action === 'sell') {
    window.location.href = '/sell'
  }
}