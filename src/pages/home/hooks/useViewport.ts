import { useState, useEffect } from 'react'
import type { UseViewportReturn } from './types'

export const useViewport = (): UseViewportReturn => {
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  }))

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = viewport.width < 768
  const isTablet = viewport.width >= 768 && viewport.width < 1024
  const isDesktop = viewport.width >= 1024

  return {
    width: viewport.width,
    height: viewport.height,
    isMobile,
    isTablet,
    isDesktop
  }
}
