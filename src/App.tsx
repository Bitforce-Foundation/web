import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import LoadingScreen from './pages/loading/LoadingScreen'
import { SessionActivityProvider } from './pages/registration/SessionActivityProvider'
import './App.css'

// Ленивая загрузка компонентов
const Home = lazy(() => import('./pages/home/Home'))
const Registration = lazy(() => import('./pages/registration/Auth'))
const Profile = lazy(() => import('./pages/profile/Profile'))
const Payment = lazy(() => import('./pages/payment/Payment'))

// Компонент загрузки для переходов между страницами
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-content">
      <div className="loading-logo">
        <div className="loading-spinner"></div>
        <span className="loading-text">BitForce</span>
      </div>
      <div className="loading-logo2">
        <img src="/src/assets/logo2.png" alt="Logo 2" />
      </div>
      <p className="loading-subtitle">Загрузка...</p>
    </div>
  </div>
)

function App() {
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    // Проверяем, был ли пользователь уже на сайте в этой сессии
    const hasSeenLoading = sessionStorage.getItem('hasSeenInitialLoading')
    
    if (hasSeenLoading) {
      // Если уже видел загрузку в этой сессии, сразу показываем контент
      setShowInitialLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    // Помечаем, что пользователь увидел начальную загрузку
    sessionStorage.setItem('hasSeenInitialLoading', 'true')
    setShowInitialLoading(false)
  }

  // Показываем LoadingScreen только при первичной загрузке страницы
  if (showInitialLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <SessionActivityProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Suspense>
    </SessionActivityProvider>
  )
}

export default App
