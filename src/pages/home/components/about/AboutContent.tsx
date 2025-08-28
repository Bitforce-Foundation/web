import FeatureCard from './FeatureCard'
import AboutImage from './AboutImage'
import type { AboutContentProps } from './types'

const AboutContent = ({ 
  features, 
  imageSrc, 
  imageAlt = 'BitForce Team', 
  className = '' 
}: AboutContentProps) => {
  return (
    <div className={`about-content ${className}`}>
      <div className="about-features">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            feature={feature}
          />
        ))}
      </div>
      
      <AboutImage 
        src={imageSrc}
        alt={imageAlt}
      />
    </div>
  )
}

export default AboutContent
