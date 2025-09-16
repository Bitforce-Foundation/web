import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

export default function AuthButton() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <Link to="/login" className="header__profile-button">
        Войти
      </Link>
    )
  }

  return (
    <div className="auth-btn-group">
      <Link to="/profile" className="header__profile-button">
        {user.email}
      </Link>
      <button onClick={logout} className="header__logout-btn">
        Выйти
      </button>
    </div>
  )
}
