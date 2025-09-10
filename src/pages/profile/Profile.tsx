import React from 'react'
import { useProfile } from './hooks'
import { LoginForm, ProfileCard } from './components'
import './Profile.css'

const Profile: React.FC = () => {
  const {
    userInfo,
    sessionInfo,
    isLoading,
    isAuthenticated,
    error,
    isLoginLoading,
    login,
    logout,
    clearError,
    refetchProfile,
  } = useProfile()

  // Добавляет отладочную информацию
  console.log('Profile Debug:', {
    isLoading,
    isAuthenticated,
    hasUserInfo: !!userInfo,
    hasSessionInfo: !!sessionInfo,
    error,
    isLoginLoading
  })

  // Показывает загрузку при инициализации
  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Проверка сессии...</p>
      </div>
    )
  }

  // Если пользователь не аутентифицирован, показывает форму логина
  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <LoginForm
          onLogin={login}
          isLoading={isLoginLoading}
          error={error}
          onClearError={clearError}
        />
      </div>
    )
  }

  // Если данные пользователя не загружены, показывает ошибку
  if (!userInfo) {
    return (
      <div className="profile-error">
        <h2>Ошибка загрузки профиля</h2>
        <p>{error || 'Не удалось загрузить данные пользователя'}</p>
        <div className="error-actions">
          <button onClick={refetchProfile} className="retry-button">
            Попробовать снова
          </button>
          <button onClick={logout} className="logout-button">
            Выйти
          </button>
        </div>
      </div>
    )
  }

  // Показывает профиль пользователя
  return (
    <div className="profile-page">
      <ProfileCard
        userInfo={userInfo}
        sessionInfo={sessionInfo}
        onLogout={logout}
        onRefresh={refetchProfile}
      />
    </div>
  )
}

export default Profile