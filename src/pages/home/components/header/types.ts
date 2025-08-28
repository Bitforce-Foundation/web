export interface HeaderProps {
  className?: string
}

export interface NavigationProps {
  mobileMenuOpen: boolean
  className?: string
}

export interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}
