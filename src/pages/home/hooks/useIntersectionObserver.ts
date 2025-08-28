import { useEffect, useRef, useState } from 'react'
import type { UseScrollOptions } from './types'

interface UseIntersectionObserverReturn {
  isVisible: boolean
  elementRef: React.RefObject<HTMLElement | null>
}

export const useIntersectionObserver = (
  options: UseScrollOptions = {}
): UseIntersectionObserverReturn => {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, rootMargin])

  return {
    isVisible,
    elementRef
  }
}
