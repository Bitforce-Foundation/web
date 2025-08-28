import type { ReactNode } from 'react'

export interface ContentSectionProps {
  className?: string
  children?: ReactNode
  background?: 'white' | 'light' | 'gradient' | 'dark'
}

export interface PrincipesBlockProps {
  id?: string
  className?: string
  children: ReactNode
  title?: string
  subtitle?: string
  background?: 'white' | 'light' | 'gradient' | 'dark'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface ContentLayoutProps {
  children: ReactNode
  className?: string
  layout?: 'single' | 'two-column' | 'three-column' | 'grid'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}