import type { CardProps } from './types'

const Card = ({ 
  className = '', 
  children, 
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  const variantClass = {
    default: 'card',
    outlined: 'card card--outlined',
    elevated: 'card card--elevated'
  }[variant]

  const paddingClass = {
    none: '',
    sm: 'card--padding-sm',
    md: 'card--padding-md',
    lg: 'card--padding-lg'
  }[padding]

  return (
    <div className={`${variantClass} ${paddingClass} ${className}`}>
      {children}
    </div>
  )
}

export default Card
