import type { SectionProps } from './types'

const Section = ({ 
  id, 
  className = '', 
  children, 
  background = 'white' 
}: SectionProps) => {
  const backgroundClass = {
    white: 'bg-white',
    light: 'bg-light',
    gradient: 'bg-gradient',
    dark: 'bg-dark'
  }[background]

  return (
    <section 
      id={id}
      className={`section ${backgroundClass} ${className}`}
    >
      {children}
    </section>
  )
}

export default Section
