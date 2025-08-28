import HeroLogo2 from './HeroLogo2'
import HeroLogo from './HeroLogo'
import type { HeroContentProps } from './types'

interface HeroContentComponentProps extends HeroContentProps {
  mainLogoSrc: string
  secondaryLogoSrc: string
}

const HeroContent = ({ 
  mainLogoSrc, 
  secondaryLogoSrc, 
  className = '' 
}: HeroContentComponentProps) => {
  return (
    <div className={`hero__content ${className}`}>
      <div className="hero__text-section">
        <HeroLogo2 />
        <HeroLogo 
          mainLogoSrc={mainLogoSrc}
          secondaryLogoSrc={secondaryLogoSrc}
        />
      </div>
    </div>
  )
}

export default HeroContent
