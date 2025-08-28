import type { ContainerProps } from './types'

const Container = ({ 
  className = '', 
  children, 
  maxWidth = 'lg' 
}: ContainerProps) => {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full'
  }[maxWidth]

  return (
    <div className={`container ${maxWidthClass} ${className}`}>
      {children}
    </div>
  )
}

export default Container
