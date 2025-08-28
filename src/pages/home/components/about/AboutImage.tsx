import type { AboutImageProps } from './types'

const AboutImage = ({ 
  src, 
  alt = 'BitForce Team', 
  className = '' 
}: AboutImageProps) => {
  return (
    <div className={`about-image ${className}`}>
      <img src={src} alt={alt} />
    </div>
  )
}

export default AboutImage
