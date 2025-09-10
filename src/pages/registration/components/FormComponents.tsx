import React from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  pattern?: string
  disabled?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength,
  pattern,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <div id={`${name}-error`} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

interface FormSectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const FormSection: React.FC<FormSectionProps> = ({ title, subtitle, children }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>
      {subtitle && <p className="form-section-subtitle">{subtitle}</p>}
      <div className="form-section-content">
        {children}
      </div>
    </div>
  )
}

interface SuccessMessageProps {
  message: string
  onClose?: () => void
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="success-message">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <div className="success-text">
          <h3>Регистрация прошла успешна!</h3>
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="success-close" aria-label="Закрыть">
            ×
          </button>
        )}
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  message: string
  onClose?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠</div>
        <div className="error-text">
          <h3>Ошибка регистрации</h3>
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="error-close" aria-label="Закрыть">
            ×
          </button>
        )}
      </div>
    </div>
  )
}
