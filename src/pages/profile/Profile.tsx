import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import type { ProfileProps } from './Types'
import {
  ProfileLayout,
  Sidebar,
  MobileNavigation
} from './components/layout'
import { LoadingSpinner } from './components/common'
import {
  GeneralSection,
  ConversionSection
} from './components/sections'

const Profile = ({ className = '' }: ProfileProps) => {
  const [activeSection, setActiveSection] = useState('general')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  const handleToggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev)
  }, [])

  const handleRetry = useCallback(() => {
    // В реальном приложении здесь будет перезагрузка данных
    window.location.reload()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className={`profile-page ${className}`}>
        <div className="profile-page__loading">
          <LoadingSpinner size="lg" />
          <span className="profile-page__loading-text">
            Загрузка профиля...
          </span>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={`profile-page ${className}`}>
        <div className="profile-page__error">
          <span className="material-icons profile-page__error-icon">
            error_outline
          </span>
          <h1 className="profile-page__error-title">
            Ошибка загрузки профиля
          </h1>
          <p className="profile-page__error-message">
            {error}
          </p>
          <div className="profile-page__error-actions">
            <button 
              onClick={handleRetry}
              className="profile-page__retry-btn"
            >
              <span className="material-icons">refresh</span>
              Повторить
            </button>
            <Link to="/" className="profile-page__home-btn">
              <span className="material-icons">home</span>
              На главную
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSection />
      case 'conversion':
        return <ConversionSection />
      case 'history':
        return (
          <div>
            <h2>История операций</h2>
            <p>Компонент истории будет добавлен позже</p>
          </div>
        )
      default:
        return <GeneralSection />
    }
  }

  return (
    <div className={`profile-page ${className}`}>
      <ProfileLayout
        sidebar={
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        }
        mobileNavigation={
          <MobileNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isOpen={isMobileNavOpen}
            onToggle={handleToggleMobileNav}
          />
        }
      >
        {renderActiveSection()}
      </ProfileLayout>
    </div>
  )
}

export default Profile
