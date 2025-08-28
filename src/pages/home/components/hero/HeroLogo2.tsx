import logo from '../../../../assets/logo2.png'
import type { HeroLogo2Props } from './types'

const HeroLogo2 = ({ className = '' }: Omit<HeroLogo2Props, 'title'>) => {
  return (
    <div className={`hero__main-text ${className}`}>
      <img src={logo} alt="Logo" className="hero__logo" />
      <p className="hero__subtitle">HEDGE FUND</p>
    </div>
  )
}

export default HeroLogo2
