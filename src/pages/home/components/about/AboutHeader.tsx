import type { AboutHeaderProps } from './types'

const AboutHeader = ({ 
  title, 
  description, 
  className = '' 
}: AboutHeaderProps) => {
  return (
    <div className={`about-header ${className}`}>
      <h2 className="about-title">{title}</h2>
      <p className="about-description">
        {description}
      </p>
    </div>
  )
}

export default AboutHeader
