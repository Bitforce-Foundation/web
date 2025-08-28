import './MobileNavigation.css'
import type { MobileNavigationProps, NavigationSection } from './types'
import NavigationItem from './NavigationItem'

const navigationSections: NavigationSection[] = [
  { id: 'general', label: 'Общее', icon: 'person' },
  { id: 'prop-trading', label: 'Проп-трейдинг', icon: 'trending_up' },
  { id: 'conversion', label: 'Конвертация', icon: 'swap_horiz' },
  { id: 'history', label: 'История', icon: 'history' }
]

const MobileNavigation = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle, 
  className = '' 
}: MobileNavigationProps) => {
  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    onToggle() // Закрываем меню после выбора
  }

  return (
    <>
      {/* Mobile Header */}
      <div className={`mobile-nav-header ${className}`}>
        <button 
          className="mobile-nav-toggle"
          onClick={onToggle}
          aria-label="Открыть меню"
        >
          <span className="material-icons">menu</span>
        </button>
        
        <h1 className="mobile-nav-title">Профиль</h1>
        
        <div className="mobile-nav-spacer" />
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="mobile-nav-overlay" onClick={onToggle} />
      )}

      {/* Mobile Navigation Menu */}
      <nav className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}>
        <div className="mobile-nav__header">
          <h2 className="mobile-nav__title">Навигация</h2>
          <button 
            className="mobile-nav__close"
            onClick={onToggle}
            aria-label="Закрыть меню"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="mobile-nav__content">
          <ul className="mobile-nav__list">
            {navigationSections.map((section) => (
              <li key={section.id} className="mobile-nav__item">
                <NavigationItem
                  id={section.id}
                  label={section.label}
                  icon={section.icon}
                  isActive={activeSection === section.id}
                  onClick={() => handleSectionChange(section.id)}
                  badge={section.badge}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default MobileNavigation
