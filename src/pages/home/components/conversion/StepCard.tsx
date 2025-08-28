import type { StepCardProps } from './types'

const StepCard = ({ step, className = '' }: StepCardProps) => {
  return (
    <div className={`step-card ${className}`}>
      <div className="step-number">{step.number}</div>
      <div className="step-content">
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
    </div>
  )
}

export default StepCard
