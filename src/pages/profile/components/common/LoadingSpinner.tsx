import type { LoadingSpinnerProps } from './types'

const LoadingSpinner = ({ 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClass = {
    sm: 'loading-spinner--sm',
    md: 'loading-spinner--md',
    lg: 'loading-spinner--lg'
  }[size]

  return (
    <div className={`loading-spinner ${sizeClass} ${className}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  )
}

export default LoadingSpinner
