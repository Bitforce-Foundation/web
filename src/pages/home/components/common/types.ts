import type { ReactNode } from 'react'

export interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
  background?: 'white' | 'light' | 'gradient' | 'dark'
}

export interface ContainerProps {
  className?: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export interface IconProps {
  name: string
  size?: number
  className?: string
  color?: string
}
