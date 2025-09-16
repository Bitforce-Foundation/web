import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import { registrationInitial, type RegistrationInitialRequest } from '../api'
import './Auth.css'

type Tab = 'login' | 'register'

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const [regForm, setRegForm] = useState<RegistrationInitialRequest>({
    username: '',
    email: '',
    phone: '',
    full_name: '',
    birth_date: '',
    eth_wallet_address: '',
    bank_account_number: '',
    bank_card_number: '',
    password: '',
    password_confirm: '',
  })

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await login(loginForm.username, loginForm.password)
      navigate('/profile')
    } catch (err: any) {
      setError(err?.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      // Клиентская валидация под требования API
      const errors: string[] = []
      if (!regForm.username || regForm.username.length < 3) errors.push('Логин: минимум 3 символа')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) errors.push('Email: некорректный формат')
      if (!/^\+7\d{10}$/.test(regForm.phone)) errors.push('Телефон: формат +7XXXXXXXXXX')
      if (!regForm.full_name.trim()) errors.push('ФИО: обязательно')
      if (!regForm.birth_date) errors.push('Дата рождения: обязательно')
      else {
        const now = new Date()
        const bd = new Date(regForm.birth_date)
        const age = now.getFullYear() - bd.getFullYear() - ((now.getMonth() < bd.getMonth() || (now.getMonth() === bd.getMonth() && now.getDate() < bd.getDate())) ? 1 : 0)
        if (age < 18) errors.push('Возраст: не менее 18 лет')
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(regForm.eth_wallet_address)) errors.push('EVM адрес: формат 0x + 40 hex')
      if (!/^\d{20}$/.test(regForm.bank_account_number)) errors.push('Банковский счёт: 20 цифр')
      if (!/^\d{16}$/.test(regForm.bank_card_number)) errors.push('Банковская карта: 16 цифр')
      if (!regForm.password || regForm.password.length < 8) errors.push('Пароль: минимум 8 символов')
      if (regForm.password !== regForm.password_confirm) errors.push('Пароли не совпадают')
      if (errors.length) throw new Error(errors.join('\n'))

      const res = await registrationInitial(regForm)
      setSuccess(res?.message || 'Регистрация успешна')
      setTab('login')
    } catch (err: any) {
      // Показываем ошибки 422 из details, если есть
      const detail = err?.response?.data?.detail
      if (Array.isArray(detail) && detail.length) {
        setError(detail.map((d: any) => `${d.loc?.join('.')}: ${d.msg}`).join('\n'))
      } else {
        setError(err?.response?.data?.message || err?.message || 'Ошибка регистрации')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(null); setSuccess(null) }}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setError(null); setSuccess(null) }}
          >
            Регистрация
          </button>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        {tab === 'login' ? (
          <form className="auth-form" onSubmit={onLoginSubmit}>
            <label className="auth-field">
              <span>Логин</span>
              <input
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="username"
                required
              />
            </label>
            <label className="auth-field">
              <span>Пароль</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </label>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Входим...' : 'Войти'}
            </button>
            <div className="auth-links">
              <Link to="/">На главную</Link>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={onRegisterSubmit}>
            <div className="auth-grid">
              <label className="auth-field">
                <span>Логин</span>
                <input value={regForm.username} onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Email</span>
                <input type="email" value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Телефон</span>
                <input value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>ФИО</span>
                <input value={regForm.full_name} onChange={(e) => setRegForm({ ...regForm, full_name: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Дата рождения</span>
                <input type="date" value={regForm.birth_date} onChange={(e) => setRegForm({ ...regForm, birth_date: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>EVM кошелёк</span>
                <input value={regForm.eth_wallet_address} onChange={(e) => setRegForm({ ...regForm, eth_wallet_address: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Банковский счёт</span>
                <input value={regForm.bank_account_number} onChange={(e) => setRegForm({ ...regForm, bank_account_number: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Банковская карта</span>
                <input value={regForm.bank_card_number} onChange={(e) => setRegForm({ ...regForm, bank_card_number: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Пароль</span>
                <input type="password" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} required />
              </label>
              <label className="auth-field">
                <span>Повторите пароль</span>
                <input type="password" value={regForm.password_confirm} onChange={(e) => setRegForm({ ...regForm, password_confirm: e.target.value })} required />
              </label>
            </div>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Отправляем...' : 'Зарегистрироваться'}
            </button>
            <div className="auth-links">
              <button type="button" className="link-like" onClick={() => setTab('login')}>У меня уже есть аккаунт</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}


