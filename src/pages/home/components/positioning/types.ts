export interface PositioningSectionProps {
  className?: string
}

export interface PositioningCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export interface PositioningData {
  logo: string
  subtitle: string
  description: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}