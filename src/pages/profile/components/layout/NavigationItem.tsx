import './NavigationItem.css'
import type { NavigationItemProps } from './types'

const NavigationItem = ({ 
  id, 
  label, 
  icon, 
  isActive, 
  onClick, 
  badge 
}: NavigationItemProps) => {
  return (
    <button
      className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      data-section={id}
    >
      <span className="nav-item__icon">
        <span className="material-icons">{icon}</span>
      </span>
      
      <span className="nav-item__label">{label}</span>
      
      {badge && (
        <span className="nav-item__badge">{badge}</span>
      )}
    </button>
  )
}

export default NavigationItem
