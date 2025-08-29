import { Link } from 'react-router-dom'
import { useState, memo, useMemo } from 'react'
import userIcon from '../assets/user.png'
import EditProfilePanel from '../components/EditProfilePanel'
import '../components/EditProfilePanel.css'
import './Profile.css'

const Profile = memo(() => {
  const [activeSection, setActiveSection] = useState('general')
  const [sidebarOpen, setSidebarOpen] = useState(true) // По умолчанию развернут

  // Данные юзеров
  const [userInfo, setUserInfo] = useState({
    fullName: 'Иван Иванович Иванов',
    nickname: 'ivan_trader',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    currency: 'RUB',
    walletAddress: 'TRC20: TQ7H...9F3K',
    passportId: '45 11 123456'
  })

  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false)

  const handleSaveProfile = (updatedInfo: typeof userInfo) => {
    setUserInfo(updatedInfo)
    setIsEditPanelOpen(false)
  }

  // Данные пропа
  const propTradingData = useMemo(() => ({
    tariffs: [
      { id: '1step', name: '1 step challenge', status: 'active', balance: 100000, currency: 'USD', profit: 12500, profitPercent: 12.5, challengeStatus: 'passed' },
      { id: '2step', name: '2 step challenge', status: 'inactive', balance: 0, currency: 'USD', profit: 0, profitPercent: 0, challengeStatus: 'pending' },
      { id: 'master', name: 'master account', status: 'inactive', balance: 0, currency: 'USD', profit: 0, profitPercent: 0, challengeStatus: 'pending' }
    ],
    charts: {
      '1step': {
        days: {
          successRate: [
            { label: 'Пн', value: 75 }, { label: 'Вт', value: 82 }, { label: 'Ср', value: 78 }, { label: 'Чт', value: 85 }, { label: 'Пт', value: 90 }, { label: 'Сб', value: 88 }, { label: 'Вс', value: 85 }
          ],
          pnl: [
            { label: 'Пн', value: 450 }, { label: 'Вт', value: 720 }, { label: 'Ср', value: -120 }, { label: 'Чт', value: 890 }, { label: 'Пт', value: 1200 }, { label: 'Сб', value: 680 }, { label: 'Вс', value: 420 }
          ]
        },
        weeks: {
          successRate: [ { label: 'Нед 1', value: 78 }, { label: 'Нед 2', value: 85 }, { label: 'Нед 3', value: 82 }, { label: 'Нед 4', value: 88 } ],
          pnl: [ { label: 'Нед 1', value: 2500 }, { label: 'Нед 2', value: 3200 }, { label: 'Нед 3', value: -800 }, { label: 'Нед 4', value: 7600 } ]
        },
        months: {
          successRate: [ { label: 'Янв', value: 82 }, { label: 'Фев', value: 79 }, { label: 'Мар', value: 85 }, { label: 'Апр', value: 87 }, { label: 'Май', value: 84 }, { label: 'Июн', value: 89 } ],
          pnl: [ { label: 'Янв', value: 12400 }, { label: 'Фев', value: 8900 }, { label: 'Мар', value: 15600 }, { label: 'Апр', value: -2300 }, { label: 'Май', value: 18200 }, { label: 'Июн', value: 21500 } ]
        },
        quarters: {
          successRate: [ { label: 'Q1', value: 80 }, { label: 'Q2', value: 86 }, { label: 'Q3', value: 83 }, { label: 'Q4', value: 87 } ],
          pnl: [ { label: 'Q1', value: 21000 }, { label: 'Q2', value: 24500 }, { label: 'Q3', value: 19800 }, { label: 'Q4', value: 26200 } ]
        }
      },
      '2step': {
        days: {
          successRate: [ { label: 'Пн', value: 68 }, { label: 'Вт', value: 72 }, { label: 'Ср', value: 70 }, { label: 'Чт', value: 76 }, { label: 'Пт', value: 78 }, { label: 'Сб', value: 74 }, { label: 'Вс', value: 73 } ],
          pnl: [ { label: 'Пн', value: 220 }, { label: 'Вт', value: 410 }, { label: 'Ср', value: -90 }, { label: 'Чт', value: 560 }, { label: 'Пт', value: 740 }, { label: 'Сб', value: 300 }, { label: 'Вс', value: 180 } ]
        },
        weeks: {
          successRate: [ { label: 'Нед 1', value: 70 }, { label: 'Нед 2', value: 74 }, { label: 'Нед 3', value: 76 }, { label: 'Нед 4', value: 79 } ],
          pnl: [ { label: 'Нед 1', value: 1400 }, { label: 'Нед 2', value: 2100 }, { label: 'Нед 3', value: -600 }, { label: 'Нед 4', value: 4200 } ]
        },
        months: {
          successRate: [ { label: 'Янв', value: 72 }, { label: 'Фев', value: 73 }, { label: 'Мар', value: 75 }, { label: 'Апр', value: 76 }, { label: 'Май', value: 78 }, { label: 'Июн', value: 80 } ],
          pnl: [ { label: 'Янв', value: 7600 }, { label: 'Фев', value: 8400 }, { label: 'Мар', value: 9100 }, { label: 'Апр', value: -1500 }, { label: 'Май', value: 9800 }, { label: 'Июн', value: 11200 } ]
        },
        quarters: {
          successRate: [ { label: 'Q1', value: 73 }, { label: 'Q2', value: 77 }, { label: 'Q3', value: 78 }, { label: 'Q4', value: 80 } ],
          pnl: [ { label: 'Q1', value: 15200 }, { label: 'Q2', value: 18900 }, { label: 'Q3', value: 14300 }, { label: 'Q4', value: 20500 } ]
        }
      },
      master: {
        days: {
          successRate: [ { label: 'Пн', value: 85 }, { label: 'Вт', value: 88 }, { label: 'Ср', value: 86 }, { label: 'Чт', value: 90 }, { label: 'Пт', value: 92 }, { label: 'Сб', value: 90 }, { label: 'Вс', value: 89 } ],
          pnl: [ { label: 'Пн', value: 900 }, { label: 'Вт', value: 1100 }, { label: 'Ср', value: 700 }, { label: 'Чт', value: 1500 }, { label: 'Пт', value: 1800 }, { label: 'Сб', value: 1200 }, { label: 'Вс', value: 1000 } ]
        },
        weeks: {
          successRate: [ { label: 'Нед 1', value: 88 }, { label: 'Нед 2', value: 90 }, { label: 'Нед 3', value: 91 }, { label: 'Нед 4', value: 93 } ],
          pnl: [ { label: 'Нед 1', value: 5200 }, { label: 'Нед 2', value: 7800 }, { label: 'Нед 3', value: 6400 }, { label: 'Нед 4', value: 9800 } ]
        },
        months: {
          successRate: [ { label: 'Янв', value: 90 }, { label: 'Фев', value: 88 }, { label: 'Мар', value: 92 }, { label: 'Апр', value: 93 }, { label: 'Май', value: 95 }, { label: 'Июн', value: 96 } ],
          pnl: [ { label: 'Янв', value: 28400 }, { label: 'Фев', value: 25900 }, { label: 'Мар', value: 31600 }, { label: 'Апр', value: 32300 }, { label: 'Май', value: 35200 }, { label: 'Июн', value: 39500 } ]
        },
        quarters: {
          successRate: [ { label: 'Q1', value: 92 }, { label: 'Q2', value: 94 }, { label: 'Q3', value: 93 }, { label: 'Q4', value: 95 } ],
          pnl: [ { label: 'Q1', value: 61200 }, { label: 'Q2', value: 78900 }, { label: 'Q3', value: 70200 }, { label: 'Q4', value: 86500 } ]
        }
      }
    },
    pairs: {
      '1step': {
        best: [ { pair: 'BTC/USDT', change: '+12.3%' }, { pair: 'ETH/USDT', change: '+9.1%' }, { pair: 'SOL/USDT', change: '+7.8%' } ],
        worst: [ { pair: 'XRP/USDT', change: '-3.4%' }, { pair: 'ADA/USDT', change: '-2.1%' }, { pair: 'TRX/USDT', change: '-1.2%' } ]
      },
      '2step': {
        best: [ { pair: 'LINK/USDT', change: '+6.2%' }, { pair: 'AVAX/USDT', change: '+5.1%' }, { pair: 'DOT/USDT', change: '+4.7%' } ],
        worst: [ { pair: 'DOGE/USDT', change: '-4.0%' }, { pair: 'MATIC/USDT', change: '-2.8%' }, { pair: 'ATOM/USDT', change: '-1.5%' } ]
      },
      master: {
        best: [ { pair: 'BTC/USDT', change: '+15.4%' }, { pair: 'ETH/USDT', change: '+11.8%' }, { pair: 'TON/USDT', change: '+9.9%' } ],
        worst: [ { pair: 'XMR/USDT', change: '-2.2%' }, { pair: 'BCH/USDT', change: '-1.9%' }, { pair: 'LTC/USDT', change: '-1.1%' } ]
      }
    }
  }), [])

  const [selectedTariff, setSelectedTariff] = useState<'1step' | '2step' | 'master'>('1step')

  // Данные конвертации
  const conversionData = useMemo(() => ({
    currentRequest: {
      status: 'active',
      amount: 50000,
      fromCurrency: 'RUB',
      toCurrency: 'USDT',
      rate: 94.20,
      createdAt: '2024-01-15T10:30:00Z'
    },
    tariffInfo: {
      type: 'Информация о тарифе ',
      description: 'Условия',
      fee: '0.5%',
      minAmount: 1000
    }
  }), [])

  // История операций
  const operationsHistory = useMemo(() => [
    {
      id: 1,
      type: 'conversion',
      date: '2024-01-15',
      time: '14:32:15',
      amount: 50000,
      currency: 'RUB',
      toAmount: 530.85,
      toCurrency: 'USDT',
      rate: 94.20,
      status: 'completed',
      details: 'Конвертация RUB → USDT',
      transactionId: 'TXN-2024-00001',
      fee: 250
    },
    {
      id: 2,
      type: 'prop_trading',
      date: '2024-01-10',
      time: '09:15:00',
      amount: 100000,
      currency: 'USD',
      status: 'active',
      details: 'Активация тарифа "Стандарт"',
      transactionId: 'PT-2024-00002',
      challenge: 'Challenge-STD-001'
    },
    {
      id: 3,
      type: 'conversion',
      date: '2024-01-08',
      time: '16:45:30',
      amount: 25000,
      currency: 'RUB',
      toAmount: 265.42,
      toCurrency: 'USDT',
      rate: 94.15,
      status: 'completed',
      details: 'Конвертация RUB → USDT',
      transactionId: 'TXN-2024-00003',
      fee: 125
    },
    {
      id: 4,
      type: 'prop_trading',
      date: '2024-01-05',
      time: '11:20:45',
      amount: 0,
      currency: 'USD',
      status: 'completed',
      details: 'Challenge пройден успешно',
      transactionId: 'PT-2024-00001',
      challenge: 'Challenge-STD-001',
      result: 'Пройден с результатом 12.5%'
      
    }
  ], [])



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Состояние для периода графиков
  const [successRatePeriod, setSuccessRatePeriod] = useState<'days' | 'weeks' | 'months' | 'quarters'>('days')
  const [pnlPeriod, setPnlPeriod] = useState<'days' | 'weeks' | 'months' | 'quarters'>('weeks')
  
  // Состояние для детального просмотра операций
  const [selectedOperation, setSelectedOperation] = useState<number | null>(null)

  const menuItems = [
    { id: 'general', name: 'Общие данные', icon: 'person' },
    { id: 'prop-trading', name: 'Трейдинг', icon: 'trending_up' },
    { id: 'conversion', name: 'Конвертация', icon: 'currency_exchange' },
    { id: 'history', name: 'История', icon: 'history' }
  ]

  const renderGeneralInfo = () => (
    <section className="profile-section">
      <div className="profile-header">
        <div>
          <h1 className="page-title">Личный кабинет</h1>
          <p className="page-subtitle">Управление профилем и настройками</p>
        </div>
        <button className="edit-profile-button" onClick={() => setIsEditPanelOpen(true)}>
          <span className="material-icons">edit</span>
          Редактировать профиль
        </button>
      </div>
      
      {/* Главная карточка как на фото */}
      <div className="profile-main-card">
        <img src={userIcon} alt="Profile" className="profile-main-avatar" />
        <div className="profile-main-info">
          <h2 className="profile-main-name">{userInfo.fullName}</h2>
          <p className="profile-main-username">@{userInfo.nickname}</p>
          <div className="profile-verification">
            <span className="material-icons">verified</span>
            Верифицирован
          </div>
        </div>
        <div className="profile-wallet-info">
          <div className="profile-wallet-label">
            <span className="material-icons">account_balance_wallet</span>
            Привязанный кошелек
          </div>
          <div className="profile-wallet-address">{userInfo.walletAddress}</div>
        </div>
      </div>

      {/* Информационные карточки */}
      <div className="profile-info-grid">
        <div className="info-card non-editable">
          <span className="material-icons">badge</span>
          <div>
            <h4>Паспорт</h4>
            <p>{userInfo.passportId}</p>
          </div>
        </div>

        <div className="info-card">
          <span className="material-icons">email</span>
          <div>
            <h4>Email</h4>
            <p>{userInfo.email}</p>
          </div>
        </div>

        <div className="info-card">
          <span className="material-icons">phone</span>
          <div>
            <h4>Телефон</h4>
            <p>{userInfo.phone}</p>
          </div>
        </div>

        <div className="info-card">
          <span className="material-icons">person</span>
          <div>
            <h4>Никнейм</h4>
            <p>@{userInfo.nickname}</p>
          </div>
        </div>

        <div className="info-card">
          <span className="material-icons">security</span>
          <div>
            <h4>Безопасность</h4>
            <p>2FA включена</p>
          </div>
        </div>
      </div>
    </section>
  )

  const renderPropTrading = () => (
    <section className="profile-section">
      <div className="page-header">
        <h1 className="page-title">Проп трейдинг</h1>
        <p className="page-subtitle">Управление тарифами и анализ результатов</p>
      </div>
      
      {/* Тарифы */}
      <div className="tariffs-grid">
        {propTradingData.tariffs.map(tariff => (
          <div
            key={tariff.id}
            className={`tariff-card ${tariff.status} ${selectedTariff === tariff.id ? 'selected' : ''}`}
            onClick={() => setSelectedTariff(tariff.id as '1step' | '2step' | 'master')}
          >
            <h3>{tariff.name}</h3>
            <div className={`tariff-status ${tariff.status}`}>
              {tariff.status === 'active' ? 'Активен' : 'Неактивен'}
            </div>
            <div className="tariff-balance">
              {tariff.balance.toLocaleString()} {tariff.currency}
            </div>
            <div className="tariff-profit">
              <span className={tariff.profit >= 0 ? 'positive' : 'negative'}>
                {tariff.profit >= 0 ? '+' : ''}{tariff.profit.toLocaleString()} {tariff.currency}
                ({tariff.profitPercent >= 0 ? '+' : ''}{tariff.profitPercent}%)
              </span>
            </div>
            <div className={`challenge-status ${tariff.challengeStatus}`}>
              {tariff.challengeStatus === 'passed' ? 'Пройден' : 
               tariff.challengeStatus === 'pending' ? 'В процессе' : 'Не пройден'}
            </div>
          </div>
        ))}
      </div>

      {/* Графики */}
      <div className="profile__charts">
        <div className="profile__card profile__chart-card">
          <div className="profile__chart-header">
            <div className="profile__chart-title">
              <h3>Процент успешных сделок</h3>
              <div className="profile__chart-info">
                <span className="material-icons">info</span>
                <span>Средний показатель за период</span>
              </div>
            </div>
              <div className="profile__period-selector">
              <button 
                className={`profile__period-btn ${successRatePeriod === 'days' ? 'active' : ''}`}
                onClick={() => setSuccessRatePeriod('days')}
              >
                Дни
              </button>
              <button 
                className={`profile__period-btn ${successRatePeriod === 'weeks' ? 'active' : ''}`}
                onClick={() => setSuccessRatePeriod('weeks')}
              >
                Недели
              </button>
              <button 
                className={`profile__period-btn ${successRatePeriod === 'months' ? 'active' : ''}`}
                onClick={() => setSuccessRatePeriod('months')}
              >
                Месяцы
              </button>
              <button 
                className={`profile__period-btn ${successRatePeriod === 'quarters' ? 'active' : ''}`}
                onClick={() => setSuccessRatePeriod('quarters')}
              >
                Кварталы
              </button>
            </div>
          </div>
          <div className="profile__chart-stats">
            <div className="profile__stat">
              <span className="profile__stat-value">
                {Math.round(propTradingData.charts[selectedTariff][successRatePeriod].successRate.reduce((sum, item) => sum + item.value, 0) / propTradingData.charts[selectedTariff][successRatePeriod].successRate.length)}%
              </span>
              <span className="profile__stat-label">Средний показатель</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">
                {Math.max(...propTradingData.charts[selectedTariff][successRatePeriod].successRate.map(item => item.value))}%
              </span>
              <span className="profile__stat-label">Максимум</span>
            </div>
          </div>
          <div className="profile__chart-container">
            <div className="profile__chart">
              {propTradingData.charts[selectedTariff][successRatePeriod].successRate.map((item, index) => (
                <div key={index} className="profile__chart-bar">
                  <div className="profile__chart-bar-container">
                    <div 
                      className="profile__chart-fill success-rate"
                      style={{ height: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="profile__chart-label">{item.label}</span>
                  <span className="profile__chart-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="profile__card profile__chart-card">
          <div className="profile__chart-header">
            <div className="profile__chart-title">
              <h3>P&L динамика</h3>
              <div className="profile__chart-info">
                <span className="material-icons">trending_up</span>
                <span>Прибыль/убыток за период</span>
              </div>
            </div>
            <div className="profile__period-selector">
              <button 
                className={`profile__period-btn ${pnlPeriod === 'days' ? 'active' : ''}`}
                onClick={() => setPnlPeriod('days')}
              >
                Дни
              </button>
              <button 
                className={`profile__period-btn ${pnlPeriod === 'weeks' ? 'active' : ''}`}
                onClick={() => setPnlPeriod('weeks')}
              >
                Недели
              </button>
              <button 
                className={`profile__period-btn ${pnlPeriod === 'months' ? 'active' : ''}`}
                onClick={() => setPnlPeriod('months')}
              >
                Месяцы
              </button>
              <button 
                className={`profile__period-btn ${pnlPeriod === 'quarters' ? 'active' : ''}`}
                onClick={() => setPnlPeriod('quarters')}
              >
                Кварталы
              </button>
            </div>
          </div>
          <div className="profile__chart-stats">
            <div className="profile__stat">
              <span className={`profile__stat-value ${propTradingData.charts[selectedTariff][pnlPeriod].pnl.reduce((sum, item) => sum + item.value, 0) >= 0 ? 'positive' : 'negative'}`}>
                {propTradingData.charts[selectedTariff][pnlPeriod].pnl.reduce((sum, item) => sum + item.value, 0) >= 0 ? '+' : ''}
                {propTradingData.charts[selectedTariff][pnlPeriod].pnl.reduce((sum, item) => sum + item.value, 0).toLocaleString()} $
              </span>
              <span className="profile__stat-label">Общий P&L</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value positive">
                +{propTradingData.charts[selectedTariff][pnlPeriod].pnl.filter(item => item.value > 0).length}
              </span>
              <span className="profile__stat-label">Прибыльных периодов</span>
            </div>
          </div>
          <div className="profile__chart-container">
            <div className="profile__chart">
              {propTradingData.charts[selectedTariff][pnlPeriod].pnl.map((item, index) => {
                const maxValue = Math.max(...propTradingData.charts[selectedTariff][pnlPeriod].pnl.map(p => Math.abs(p.value)))
                const height = (Math.abs(item.value) / maxValue) * 100
                return (
                  <div key={index} className="profile__chart-bar">
                    <div className="profile__chart-bar-container">
                      <div 
                        className={`profile__chart-fill ${item.value >= 0 ? 'positive' : 'negative'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="profile__chart-label">{item.label}</span>
                    <span className={`profile__chart-value ${item.value >= 0 ? 'positive' : 'negative'}`}>
                      {item.value >= 0 ? '+' : ''}{item.value.toLocaleString()} $
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Самые прибыльные и неприбыльные пары */}
        <div className="profile__cards">
          <div className="profile__card">
            <h3><span className="material-icons">north_east</span>Самые прибыльные пары</h3>
            <ul className="pairs-list">
              {propTradingData.pairs[selectedTariff].best.map((p, idx) => (
                <li key={idx} className="pair-item positive">
                  <span className="pair-name">{p.pair}</span>
                  <span className="pair-change">{p.change}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="profile__card">
            <h3><span className="material-icons">south_west</span>Самые неприбыльные пары</h3>
            <ul className="pairs-list">
              {propTradingData.pairs[selectedTariff].worst.map((p, idx) => (
                <li key={idx} className="pair-item negative">
                  <span className="pair-name">{p.pair}</span>
                  <span className="pair-change">{p.change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )

  const renderConversion = () => (
    <section className="profile-section">
      <div className="page-header">
        <h1 className="page-title">Конвертация</h1>
        <p className="page-subtitle">Управление заявками и тарифами</p>
      </div>
      
      {/* Статус заявки */}
      <div className="conversion-status-card">
        <div className="conversion-header">
          <h3>Текущая заявка</h3>
          <div className={`conversion-status ${conversionData.currentRequest.status}`}>
            {conversionData.currentRequest.status === 'active' ? 'Активная' : 
             conversionData.currentRequest.status === 'waiting' ? 'Ожидание' : 'Завершена'}
          </div>
        </div>
        
        <div className="conversion-details">
          <div className="conversion-amount">
            {conversionData.currentRequest.amount.toLocaleString()} {conversionData.currentRequest.fromCurrency}
          </div>
          <div className="conversion-direction">
            {conversionData.currentRequest.fromCurrency} → {conversionData.currentRequest.toCurrency}
          </div>
          <div className="conversion-info-grid">
            <div className="conversion-info-item">
              <span>Курс</span>
              <span>{conversionData.currentRequest.rate} ₽</span>
            </div>
            <div className="conversion-info-item">
              <span>Дата</span>
              <span>{new Date(conversionData.currentRequest.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Тариф */}
      <div className="conversion-tariff-card">
        <h3>{conversionData.tariffInfo.type}</h3>
        <p className="tariff-description">{conversionData.tariffInfo.description}</p>
        <div className="tariff-specs">
          <div className="spec-item">
            <span className="material-icons">percent</span>
            <div>
              <strong>Комиссия</strong>
              <span>{conversionData.tariffInfo.fee}</span>
            </div>
          </div>
          <div className="spec-item">
            <span className="material-icons">payments</span>
            <div>
              <strong>Мин. сумма</strong>
              <span>{conversionData.tariffInfo.minAmount.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderHistory = () => (
    <div className="profile__section">
      <h2>История операций</h2>
      <div className="profile__card">
        <div className="profile__history">
          {operationsHistory.map(operation => (
            <div key={operation.id} className="profile__history-item">
              <div 
                className="profile__history-main"
                onClick={() => setSelectedOperation(selectedOperation === operation.id ? null : operation.id)}
              >
                <div className="profile__history-icon">
                  <span className="material-icons">
                    {operation.type === 'conversion' ? 'currency_exchange' : 'trending_up'}
                  </span>
                </div>
                <div className="profile__history-details">
                  <div className="profile__history-title">{operation.details}</div>
                  <div className="profile__history-meta">
                    <em className="profile__history-date">{operation.date}</em>
                    <em className="profile__history-time">{operation.time}</em>
                    <em className="profile__history-id">ID: {operation.transactionId}</em>
                  </div>
                </div>
                <div className="profile__history-amount">
                  {operation.amount > 0 && (
                    <em className="profile__amount-value">
                      {operation.amount.toLocaleString()} {operation.currency}
                    </em>
                  )}
                </div>
                <div className={`profile__history-status ${operation.status}`}>
                  {operation.status === 'completed' ? 'Завершено' : 
                   operation.status === 'active' ? 'Активно' : 'В процессе'}
                </div>
                <div className="profile__history-expand">
                  <span className="material-icons">
                    {selectedOperation === operation.id ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>
              
              {selectedOperation === operation.id && (
                <div className="profile__history-expanded">
                  <div className="profile__operation-details">
                    <h4>Подробная информация</h4>
                    <div className="profile__details-grid">
                      <div className="profile__detail-item">
                        <span className="profile__detail-label">ID операции:</span>
                        <span className="profile__detail-value">{operation.transactionId}</span>
                      </div>
                      <div className="profile__detail-item">
                        <span className="profile__detail-label">Дата и время:</span>
                        <span className="profile__detail-value">
                          <em>{operation.date} в {operation.time}</em>
                        </span>
                      </div>
                      <div className="profile__detail-item">
                        <span className="profile__detail-label">Тип операции:</span>
                        <span className="profile__detail-value">
                          {operation.type === 'conversion' ? 'Конвертация валют' : 'Проп трейдинг'}
                        </span>
                      </div>
                      {operation.type === 'conversion' && (
                        <>
                          <div className="profile__detail-item">
                            <span className="profile__detail-label">Сумма:</span>
                            <span className="profile__detail-value">
                              <em>{operation.amount.toLocaleString()} {operation.currency}</em>
                            </span>
                          </div>
                          <div className="profile__detail-item">
                            <span className="profile__detail-label">Получено:</span>
                            <span className="profile__detail-value">
                              <em>{operation.toAmount} {operation.toCurrency}</em>
                            </span>
                          </div>
                          <div className="profile__detail-item">
                            <span className="profile__detail-label">Курс:</span>
                            <span className="profile__detail-value">
                              <em>{operation.rate} ₽ за 1 {operation.toCurrency}</em>
                            </span>
                          </div>
                          <div className="profile__detail-item">
                            <span className="profile__detail-label">Комиссия:</span>
                            <span className="profile__detail-value">
                              <em>{operation.fee} {operation.currency}</em>
                            </span>
                          </div>
                        </>
                      )}
                      {operation.type === 'prop_trading' && (
                        <>
                          {operation.challenge && (
                            <div className="profile__detail-item">
                              <span className="profile__detail-label">Challenge:</span>
                              <span className="profile__detail-value">
                                <em>{operation.challenge}</em>
                              </span>
                            </div>
                          )}
                          {operation.result && (
                            <div className="profile__detail-item">
                              <span className="profile__detail-label">Результат:</span>
                              <span className="profile__detail-value">
                                <em>{operation.result}</em>
                              </span>
                            </div>
                          )}
                          {operation.amount > 0 && (
                            <div className="profile__detail-item">
                              <span className="profile__detail-label">Размер счета:</span>
                              <span className="profile__detail-value">
                                <em>{operation.amount.toLocaleString()} {operation.currency}</em>
                              </span>
                            </div>
                          )}
                        </>
                      )}
                      <div className="profile__detail-item">
                        <span className="profile__detail-label">Статус:</span>
                        <span className={`profile__detail-value ${operation.status}`}>
                          {operation.status === 'completed' ? 'Успешно завершено' : 
                           operation.status === 'active' ? 'Активна' : 'В процессе выполнения'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-root">
      <EditProfilePanel
        isOpen={isEditPanelOpen}
        onClose={() => setIsEditPanelOpen(false)}
        userInfo={userInfo}
        onSave={handleSaveProfile}
      />
      {/* Desktop Sidebar */}
      <aside className={`profile__sidebar ${sidebarOpen ? 'expanded' : ''}`}>
        <div className="profile__sidebar-header">
          <button className="profile__toggle-btn" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          {sidebarOpen && <img src={userIcon} alt="User" className="profile__user-avatar" />}
        </div>
        
        <nav className="profile__sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`profile__nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="profile__nav-icon material-icons">{item.icon}</span>
              <span className="profile__nav-text">{item.name}</span>
            </button>
          ))}
          
          <Link to="/" className="profile__nav-item profile__home-btn">
            <span className="profile__nav-icon material-icons">home</span>
            <span className="profile__nav-text">Домой</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="profile__mobile-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`profile__mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="profile__mobile-icon material-icons">{item.icon}</span>
            <span className="profile__mobile-text">{item.name}</span>
          </button>
        ))}
        
        <Link to="/" className="profile__mobile-nav-item">
          <span className="profile__mobile-icon material-icons">home</span>
          <span className="profile__mobile-text">Домой</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className={`page-main profile-main ${sidebarOpen ? 'sidebar-expanded' : ''}`}>
        <div className="page-container">
          {activeSection === 'general' && renderGeneralInfo()}
          {activeSection === 'prop-trading' && renderPropTrading()}
          {activeSection === 'conversion' && renderConversion()}
          {activeSection === 'history' && renderHistory()}
        </div>
      </main>
    </div>
  )
})

export default Profile