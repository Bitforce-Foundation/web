import type { EmptyStateProps } from './types'

const EmptyState = ({ 
  title, 
  description, 
  icon = 'inbox', 
  action, 
  className = '' 
}: EmptyStateProps) => {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__icon">
        <span className="material-icons">{icon}</span>
      </div>
      <div className="empty-state__content">
        <h3 className="empty-state__title">{title}</h3>
        {description && (
          <p className="empty-state__description">{description}</p>
        )}
        {action && (
          <button 
            className="empty-state__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
