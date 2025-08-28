import { Link } from 'react-router-dom'
import { useMobileMenu } from './useMobileMenu'
import type { HeaderProps } from './types'
import logo from '../../../../assets/logo2.png'
import './Header.css'

const Header = ({ className = '' }: HeaderProps) => {
  const { mobileMenuOpen, toggleMobileMenu } = useMobileMenu()

  return (
    <header className={`header ${className}`}>
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="BitForce" className="header__logo-img" />
        </Link>
      </div>

      <nav className={`header__nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/products" onClick={() => toggleMobileMenu()}>Продукты</Link>
        <Link to="/about" onClick={() => toggleMobileMenu()}>О нас</Link>
        <Link to="/contacts" onClick={() => toggleMobileMenu()}>Контакты</Link>
      </nav>

      <div className="header__actions">
        <Link to="/profile" className="header__profile-button">
          Личный кабинет
        </Link>
        
        <button 
          className={`header__burger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
