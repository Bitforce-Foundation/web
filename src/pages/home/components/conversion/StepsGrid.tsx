import StepCard from './StepCard'
import type { StepsGridProps } from './types'

const StepsGrid = ({ steps, className = '' }: StepsGridProps) => {
  return (
    <div className={`steps-grid ${className}`}>
      {steps.map((column, columnIndex) => (
        <div key={columnIndex} className="steps-column">
          {column.map((step) => (
            <StepCard 
              key={step.number} 
              step={step}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default StepsGrid
