import type { HeroLogoProps } from './types'

const HeroLogo = ({ 
  mainLogoSrc, 
  secondaryLogoSrc, 
  className = '' 
}: Omit<HeroLogoProps, 'subtitle'>) => {
  return (
    <div className={`hero__logo-section ${className}`}>
      <div className="hero__main-logo">
        <img src={mainLogoSrc} alt="BitForce" className="hero__main-logo-img" />
        <img src={secondaryLogoSrc} alt="BitForce Logo2" className="hero__logo2-img" />
      </div>
      <p className="hero__subtitle">
        <span className="accent-first">Первый в России</span> хедж-фонд <br />
        <span className="center-text">цифровых активов</span><br /> <br /><br />
      </p>
    </div>
  )
}

export default HeroLogo
