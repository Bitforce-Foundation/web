import React, { useState } from 'react'

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => Promise<boolean>
  isLoading: boolean
  error: string | null
  onClearError: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  isLoading,
  error,
  onClearError,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<{
    username?: string
    password?: string
  }>({})

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {}

    if (!username.trim()) {
      errors.username = 'Имя пользователя обязательно'
    }

    if (!password) {
      errors.password = 'Пароль обязателен'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onClearError()
    const success = await onLogin({ username, password })
    
    if (success) {
      setUsername('')
      setPassword('')
      setValidationErrors({})
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    if (validationErrors.username) {
      setValidationErrors(prev => ({ ...prev, username: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: undefined }))
    }
  }

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2 className="login-form-title">Вход в профиль</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={`form-input ${validationErrors.username ? 'error' : ''}`}
              placeholder="Введите имя пользователя"
              disabled={isLoading}
            />
            {validationErrors.username && (
              <span className="field-error">{validationErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-input ${validationErrors.password ? 'error' : ''}`}
              placeholder="Введите пароль"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <span className="field-error">{validationErrors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
