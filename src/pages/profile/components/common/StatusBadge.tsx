import type { StatusBadgeProps } from './types'

const StatusBadge = ({ 
  status, 
  size = 'md', 
  className = '' 
}: StatusBadgeProps) => {
  const statusConfig = {
    active: { label: 'Активен', class: 'status-badge--active' },
    inactive: { label: 'Неактивен', class: 'status-badge--inactive' },
    completed: { label: 'Завершено', class: 'status-badge--completed' },
    pending: { label: 'В процессе', class: 'status-badge--pending' },
    failed: { label: 'Ошибка', class: 'status-badge--failed' },
    waiting: { label: 'Ожидание', class: 'status-badge--waiting' }
  }

  const sizeClass = {
    sm: 'status-badge--sm',
    md: 'status-badge--md',
    lg: 'status-badge--lg'
  }[size]

  const config = statusConfig[status]

  return (
    <div className={`status-badge ${config.class} ${sizeClass} ${className}`}>
      {config.label}
    </div>
  )
}

export default StatusBadge
