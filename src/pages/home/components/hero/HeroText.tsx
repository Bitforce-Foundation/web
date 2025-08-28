import type { HeroTextProps } from './types'

const HeroText = ({ className = '' }: Omit<HeroTextProps, 'title'>) => {
  return (
    <div className={`hero__main-text ${className}`}>
      <h1 className="hero__main-title">
        Ваш <span className="accent-partner">надежный партнер</span><br />
        в мире<br />
        цифровых активов
      </h1>
    </div>
  )
}

export default HeroText
