import HeroContent from './HeroContent'
import type { HeroSectionProps } from './types'
import mainlogo from '../../../../assets/mainlogo.png'
import logo from '../../../../assets/logo2.png'
import './HeroSection.css'

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <main className={`hero ${className}`}>
      <HeroContent 
        mainLogoSrc={mainlogo}
        secondaryLogoSrc={logo}
      />
    </main>
  )
}

export default HeroSection
