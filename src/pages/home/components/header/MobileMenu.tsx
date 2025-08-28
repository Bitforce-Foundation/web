import type { MobileMenuProps } from './types'

const MobileMenu = ({ isOpen, onToggle, className = '' }: MobileMenuProps) => {
  return (
    <div 
      className={`header__burger ${isOpen ? 'active' : ''} ${className}`}
      onClick={onToggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default MobileMenu
