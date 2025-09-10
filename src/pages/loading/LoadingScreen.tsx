import { useState, useEffect } from 'react'
import logo2 from '../../assets/logo2.png'
import mainlogo from '../../assets/mainlogo.png'
import './LoadingScreen.css'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 500)
    }, 3500)

    const safetyTimer = setTimeout(() => {
      console.warn('LoadingScreen safety timeout triggered')
      onLoadingComplete()
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(safetyTimer)
    }
  }, [onLoadingComplete])

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <img 
            src={mainlogo} 
            alt="BitForce Logo" 
            className="loading-main-logo"
            onError={(e) => {
              console.error('Failed to load mainlogo:', e)
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.innerHTML = '<span class="loading-logo-f">F</span><span class="loading-logo-b">B</span>'
              fallback.style.cssText = 'font-size: 16rem; color: #dbc08f; letter-spacing: 0; line-height: 1; display: flex; align-items: center; justify-content: center;'
              target.parentNode?.appendChild(fallback)
            }}
          />

        </div>
        
        <div className="loading-logo2">
          <img 
            src={logo2} 
            alt="BitForce Logo" 
            onError={(e) => {
              console.error('Failed to load logo2:', e)
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.textContent = 'BitForce'
              fallback.style.cssText = 'font-size: 2rem; color: #dbc08f; font-weight: bold;'
              target.parentNode?.appendChild(fallback)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen