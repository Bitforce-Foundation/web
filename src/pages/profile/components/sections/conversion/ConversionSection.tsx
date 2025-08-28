import './ConversionSection.css'
import type { ConversionSectionProps } from '../types'
import Section from '../Section'
import ConversionForm from './ConversionForm'
import ConversionHistory from './ConversionHistory'
import ConversionStats from './ConversionStats'

const ConversionSection = ({ className = '' }: ConversionSectionProps) => {
  return (
    <div className={`conversion-section ${className}`}>
      <Section title="Быстрая конвертация">
        <ConversionForm />
      </Section>

      <Section title="Статистика конвертации">
        <ConversionStats />
      </Section>

      <Section title="История конвертации">
        <ConversionHistory />
      </Section>
    </div>
  )
}

export default ConversionSection
