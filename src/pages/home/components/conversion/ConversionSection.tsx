import ConversionHeader from './ConversionHeader'
import StepsGrid from './StepsGrid'
import { conversionSteps, conversionContent } from './data'
import type { ConversionSectionProps } from './types'
import './ConversionSection.css'

const ConversionSection = ({ className = '' }: ConversionSectionProps) => {
  return (
    <section id="conversion" className={`conversion-section ${className}`}>
      <div className="conversion-container">
        <ConversionHeader 
          title={conversionContent.title}
          description={conversionContent.description}
        />
        
        <h3 className="steps-title">{conversionContent.stepsTitle}</h3>
        
        <StepsGrid steps={conversionSteps} />
      </div>
    </section>
  )
}

export default ConversionSection
