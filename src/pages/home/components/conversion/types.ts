export interface ConversionSectionProps {
  className?: string
}

export interface ConversionHeaderProps {
  title: string
  description: string
  className?: string
}

export interface StepsGridProps {
  steps: Step[][]
  className?: string
}

export interface StepCardProps {
  step: Step
  className?: string
}

export interface Step {
  number: number
  title: string
  description: string
}
