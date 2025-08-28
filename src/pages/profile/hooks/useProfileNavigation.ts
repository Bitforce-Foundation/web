import { useState, useCallback } from 'react'
import type { UseProfileNavigation } from '../Types'

/**
 * Хук для управления навигацией профиля
 * Следует принципу Single Responsibility - отвечает только за навигацию
 */
export const useProfileNavigation = (
  initialSection: string = 'general'
): UseProfileNavigation => {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const handleSetActiveSection = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev)
  }, [])

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false)
  }, [])

  return {
    activeSection,
    isMobileNavOpen,
    setActiveSection: handleSetActiveSection,
    toggleMobileNav,
    closeMobileNav
  }
}
