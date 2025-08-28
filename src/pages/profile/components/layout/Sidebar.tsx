import './Sidebar.css'
import type { SidebarProps, NavigationSection } from './types'
import NavigationItem from './NavigationItem'

const navigationSections: NavigationSection[] = [
  { id: 'general', label: 'Общее', icon: 'person' },
  { id: 'prop-trading', label: 'Проп-трейдинг', icon: 'trending_up' },
  { id: 'conversion', label: 'Конвертация', icon: 'swap_horiz' },
  { id: 'history', label: 'История', icon: 'history' }
]

const Sidebar = ({ 
  activeSection, 
  onSectionChange, 
  className = '' 
}: SidebarProps) => {
  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__header">
        <h2 className="sidebar__title">Профиль</h2>
      </div>
      
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigationSections.map((section) => (
            <li key={section.id} className="sidebar__nav-item">
              <NavigationItem
                id={section.id}
                label={section.label}
                icon={section.icon}
                isActive={activeSection === section.id}
                onClick={() => onSectionChange(section.id)}
                badge={section.badge}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
