import type { HeroLogoProps } from './types'

const HeroLogo = ({ 
  mainLogoSrc, 
  className = '' 
}: Omit<HeroLogoProps, 'subtitle'>) => {
  return (
    <div className={`hero__logo-section ${className}`}>
      <div className="hero__main-logo">
        <img src={mainLogoSrc} alt="BitForce" className="hero__main-logo-img" />
      </div>
    </div>
  )
}

export default HeroLogo