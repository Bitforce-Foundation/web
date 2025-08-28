import AboutHeader from './AboutHeader'
import AboutContent from './AboutContent'
import { aboutContent, features } from './data'
import type { AboutSectionProps } from './types'
import leadImage from '../../../../assets/lead.png'
import './AboutSection.css'

const AboutSection = ({ className = '' }: AboutSectionProps) => {
  return (
    <section id="about" className={`about-section ${className}`}>
      <div className="about-container">
        <AboutHeader 
          title={aboutContent.title}
          description={aboutContent.description}
        />
        
        <AboutContent 
          features={features}
          imageSrc={leadImage}
          imageAlt="BitForce Team"
        />
      </div>
    </section>
  )
}

export default AboutSection
