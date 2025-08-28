export interface AboutSectionProps {
  className?: string
}

export interface AboutHeaderProps {
  title: string
  description: string
  className?: string
}

export interface AboutContentProps {
  features: Feature[]
  imageSrc: string
  imageAlt?: string
  className?: string
}

export interface FeatureCardProps {
  feature: Feature
  className?: string
}

export interface Feature {
  title: string
  description: string
}

export interface AboutImageProps {
  src: string
  alt?: string
  className?: string
}
