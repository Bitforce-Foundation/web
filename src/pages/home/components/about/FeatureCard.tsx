import type { FeatureCardProps } from './types'

const FeatureCard = ({ feature, className = '' }: FeatureCardProps) => {
  return (
    <div className={`feature-card ${className}`}>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
    </div>
  )
}

export default FeatureCard
