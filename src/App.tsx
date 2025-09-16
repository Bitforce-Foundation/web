import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import logo2 from './assets/logo2.png'
import './App.css'
import './layout.css'
import './components/components.css'

// Убраны отладочные вызовы API при старте приложения, чтобы не засорять консоль ошибок

// Ленивая загрузка компонентов
const Home = lazy(() => import('./pages/Home'))
const Buy = lazy(() => import('./pages/Buy'))
const Sell = lazy(() => import('./pages/Sell'))
const Profile = lazy(() => import('./pages/Profile'))
const Login = lazy(() => import('./pages/Login.tsx'))
const Auth = lazy(() => import('./pages/Auth'))

// Компонент загрузки для переходов между страницами
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-content">
      <div className="loading-logo2">
        <img src={logo2} alt="BitForce Logo" />
      </div>
      <p className="loading-subtitle">Пожалуйста, подождите...</p>
    </div>
  </div>
)

function App() {
  
  
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    console.log('🔄 App useEffect запущен')
    // Проверяем, был ли пользователь уже на сайте в этой сессии
    const hasSeenLoading = sessionStorage.getItem('hasSeenInitialLoading')
    console.log(' hasSeenLoading:', hasSeenLoading)
    
    if (hasSeenLoading) {
      // Если уже видел загрузку в этой сессии, сразу показываем контент
      console.log(' Показываем контент сразу')
      setShowInitialLoading(false)
    } else {
      console.log(' Показываем начальную загрузку')
    }

    // Убрано: тестовые вызовы API
  }, [])

  const handleLoadingComplete = () => {
    // Помечаем, что пользователь увидел начальную загрузку
    sessionStorage.setItem('hasSeenInitialLoading', 'true')
    setShowInitialLoading(false)
  }

  // Показываем LoadingScreen только при первичной загрузке страницы
  if (showInitialLoading) {
    console.log('🎬 Показываем LoadingScreen')
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  console.log('🏠 Показываем основное приложение')

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Suspense>
  )
}

export default App
