import { Link } from 'react-router-dom'
import type { NavigationProps } from './types'

const Navigation = ({ mobileMenuOpen, className = '' }: NavigationProps) => {
  return (
    <nav className={`header__nav ${mobileMenuOpen ? 'mobile-open' : ''} ${className}`}>
      <Link to="/buy">Купить</Link>
      <Link to="/sell">Продать</Link>
      <a href="#services">Услуги</a>
      <a href="#about">О нас</a>
      <a href="#conversion">Конвертация</a>
    </nav>
  )
}

export default Navigation
