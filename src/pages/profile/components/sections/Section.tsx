import './Section.css'
import type { SectionProps } from './types'

const Section = ({ 
  title, 
  children, 
  className = '', 
  actions 
}: SectionProps) => {
  return (
    <section className={`section ${className}`}>
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        {actions && (
          <div className="section__actions">
            {actions}
          </div>
        )}
      </div>
      
      <div className="section__content">
        {children}
      </div>
    </section>
  )
}

export default Section
