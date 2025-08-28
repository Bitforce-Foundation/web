import { memo } from 'react'
import { Section, Container } from '../common'
import type { ContentSectionProps } from './types'
import './PrincipesSection.css'

const ContentSection = memo(({ 
  className = '', 
  children,
  background = 'white'
}: ContentSectionProps) => {
  return (
    <Section 
      id="content"
      className={`content-section ${className}`}
      background={background}
    >
      <Container maxWidth="xl">
        <div className="content-wrapper">
          {children || (
            <div className="content-placeholder">
              <h2 className="content-placeholder-title">Наши ценности</h2>
              <div className="content-placeholder-text">
                <p>
                  Безопасность и прозрачность — это основа всего, что мы делаем. 
                  Мы строим долгосрочные отношения, основанные на доверии, и понимаем, 
                  что в сфере цифровых активов именно эти качества являются ключевыми 
                  для уверенности каждого клиента. Поэтому мы разрабатываем продукты 
                  и сервисы, которые сочетают в себе надежность, простоту и современные 
                  технологии, позволяя нашим пользователям взаимодействовать с цифровыми 
                  активами максимально комфортно и безопасно.
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
})

ContentSection.displayName = 'ContentSection'

export default ContentSection