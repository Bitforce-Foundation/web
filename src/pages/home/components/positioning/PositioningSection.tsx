import Section from '../common/Section'
import Container from '../common/Container'
import type { PositioningSectionProps, PositioningCardProps } from './types'
import { positioningData } from './data'
import logo2 from '../../../../assets/logo2.png'
import './PositioningSection.css'

const PositioningCard = ({ icon, title, description, className = '' }: PositioningCardProps) => {
  return (
    <div className={`positioning-card ${className}`}>
      <div className="positioning-card__icon">
        <span className={`icon ${icon}`}></span>
      </div>
      <h3 className="positioning-card__title">{title}</h3>
      <p className="positioning-card__description">{description}</p>
    </div>
  )
}

const PositioningSection = ({ className = '' }: PositioningSectionProps) => {
  return (
    <Section id="positioning" className={`positioning-section ${className}`}>
      <Container maxWidth="xl">
        <div className="positioning-section__content">
          <div className="positioning-section__header">
            <div className="positioning-section__logo">
              <img 
                src={logo2} 
                alt="Bitforce Logo" 
                className="positioning-section__logo-image"
              />
            </div>
            <h3 className="positioning-section__subtitle">{positioningData.subtitle}</h3>
            <p className="positioning-section__description">{positioningData.description}</p>
          </div>
          
          <div className="positioning-section__grid">
            {positioningData.features.map((feature, index) => (
              <PositioningCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="positioning-section__card"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default PositioningSection