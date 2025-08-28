import type { ConversionHeaderProps } from './types'

const ConversionHeader = ({ 
  title, 
  description, 
  className = '' 
}: ConversionHeaderProps) => {
  return (
    <div className={`conversion-header ${className}`}>
      <h2>{title}</h2>
      <p className="conversion-description">
        {description}
      </p>
    </div>
  )
}

export default ConversionHeader
