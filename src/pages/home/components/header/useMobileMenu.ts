import { useState, useCallback } from 'react'

export const useMobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true)
  }, [])

  return {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu
  }
}
