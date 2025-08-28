import { memo } from 'react'
import { Section } from '../common'
import type { PrincipesBlockProps } from './types'

const PrincipesBlock = memo(({ 
  id,
  className = '', 
  children,
  title,
  subtitle,
  background = 'white',
  padding = 'md'
}: PrincipesBlockProps) => {
  const paddingClass = `content-block-padding-${padding}`

  return (
    <Section 
      id={id}
      className={`content-block ${paddingClass} ${className}`}
      background={background}
    >
      {(title || subtitle) && (
        <div className="content-block-header">
          {title && (
            <h2 className="content-block-title">{title}</h2>
          )}
          {subtitle && (
            <p className="content-block-subtitle">{subtitle}</p>
          )}
        </div>
      )}
      <div className="content-block-body">
        {children}
      </div>
    </Section>
  )
})

PrincipesBlock.displayName = 'PrincipesBlock'

export default PrincipesBlock
