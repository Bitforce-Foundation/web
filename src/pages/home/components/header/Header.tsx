import { Link } from 'react-router-dom'
import Navigation from './navigation' 
import MobileMenu from './MobileMenu'
import { useMobileMenu } from './useMobileMenu'
import type { HeaderProps } from './types'
import logo from '../../../../assets/logo2.png'
import './Header.css'

const Header = ({ className = '' }: HeaderProps) => {
  const { mobileMenuOpen, toggleMobileMenu } = useMobileMenu()

  return (
    <header className={`header ${className}`}>
      <div className="header__logo-menu">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <Navigation mobileMenuOpen={mobileMenuOpen} />
      </div>
      <div className="header__actions">
        <Link to="/profile" className="header__profile-button">
          Личный кабинет
        </Link>
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onToggle={toggleMobileMenu} 
        />
      </div>
    </header>
  )
}

export default Header
