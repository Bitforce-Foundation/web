import type { ReactNode } from 'react'

export interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  className?: string
}

export interface MobileNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export interface ProfileLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  mobileNavigation: ReactNode
  className?: string
}

export interface NavigationItemProps {
  id: string
  label: string
  icon: string
  isActive: boolean
  onClick: () => void
  badge?: string | number
}

export interface NavigationSection {
  id: string
  label: string
  icon: string
  badge?: string | number
}
