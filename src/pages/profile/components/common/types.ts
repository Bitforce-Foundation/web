import type { ReactNode } from 'react'

export interface CardProps {
  className?: string
  children: ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'completed' | 'pending' | 'failed' | 'waiting'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface StatProps {
  label: string
  value: string | number
  trend?: 'positive' | 'negative' | 'neutral'
  icon?: string
  className?: string
}

export interface PeriodButtonProps {
  period: string
  label: string
  isActive: boolean
  onClick: (period: string) => void
  className?: string
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}
