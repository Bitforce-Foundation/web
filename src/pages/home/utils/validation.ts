import type { ValidationRule, ValidationResult } from './types'

/**
 * Валидирует значение по заданным правилам
 */
export const validateField = (value: string, rules: ValidationRule): ValidationResult => {
  const errors: string[] = []

  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push('Поле обязательно для заполнения')
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Минимальная длина: ${rules.minLength} символов`)
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Максимальная длина: ${rules.maxLength} символов`)
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push('Неверный формат')
  }

  if (rules.custom && !rules.custom(value)) {
    errors.push('Значение не прошло проверку')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Валидирует email адрес
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return validateField(email, {
    required: true,
    pattern: emailPattern
  })
}

/**
 * Валидирует номер телефона (российский формат)
 */
export const validatePhone = (phone: string): ValidationResult => {
  const phonePattern = /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
  return validateField(phone, {
    required: true,
    pattern: phonePattern
  })
}

/**
 * Валидирует пароль
 */
export const validatePassword = (password: string): ValidationResult => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Пароль должен содержать минимум 8 символов')
  }

  if (!hasUpperCase) {
    errors.push('Пароль должен содержать заглавные буквы')
  }

  if (!hasLowerCase) {
    errors.push('Пароль должен содержать строчные буквы')
  }

  if (!hasNumbers) {
    errors.push('Пароль должен содержать цифры')
  }

  if (!hasSpecialChar) {
    errors.push('Пароль должен содержать специальные символы')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
