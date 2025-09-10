import type { RegistrationFormData } from '../types'

// Конфигурация полей формы
export interface FieldConfig {
  name: keyof RegistrationFormData
  label: string
  type?: string
  placeholder: string
  required: boolean
  maxLength?: number
  pattern?: string
  section: 'personal' | 'security' | 'crypto' | 'banking'
  useCustomHandler?: boolean
}

export const FORM_FIELDS: FieldConfig[] = [
  // Основная информация
  {
    name: 'username',
    label: 'Логин',
    placeholder: 'Введите логин',
    required: true,
    section: 'personal'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
    required: true,
    section: 'personal'
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    placeholder: '+7 (999) 123-45-67',
    required: true,
    section: 'personal',
    useCustomHandler: true
  },
  {
    name: 'full_name',
    label: 'ФИО',
    placeholder: 'Иванов Иван Иванович',
    required: true,
    section: 'personal'
  },
  {
    name: 'birth_date',
    label: 'Дата рождения',
    type: 'date',
    placeholder: 'YYYY-MM-DD',
    required: true,
    section: 'personal'
  },

  // Безопасность
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Минимум 8 символов и спецсимвол',
    required: true,
    section: 'security'
  },
  {
    name: 'password_confirm',
    label: 'Подтверждение пароля',
    type: 'password',
    placeholder: 'Повторите пароль',
    required: true,
    section: 'security'
  },

  // Криптокошелек
  {
    name: 'eth_wallet_address',
    label: 'Адрес Ethereum кошелька',
    placeholder: '0x...',
    required: true,
    maxLength: 42,
    pattern: '^0x[a-fA-F0-9]{40}$',
    section: 'crypto'
  },

  // Банковские данные
  {
    name: 'bank_account_number',
    label: 'Номер банковского счета',
    placeholder: '20 цифр',
    required: true,
    maxLength: 20,
    section: 'banking',
    useCustomHandler: true
  },
  {
    name: 'bank_bik',
    label: 'БИК банка',
    placeholder: '9 цифр',
    required: true,
    maxLength: 9,
    section: 'banking',
    useCustomHandler: true
  },
  {
    name: 'bank_card_number',
    label: 'Номер банковской карты',
    placeholder: '1234 5678 9012 3456',
    required: true,
    maxLength: 19,
    section: 'banking',
    useCustomHandler: true
  }
]

// Группировка полей по секциям
export const PERSONAL_FIELDS = FORM_FIELDS.filter(field => field.section === 'personal')
export const SECURITY_FIELDS = FORM_FIELDS.filter(field => field.section === 'security')
export const CRYPTO_FIELDS = FORM_FIELDS.filter(field => field.section === 'crypto')
export const BANKING_FIELDS = FORM_FIELDS.filter(field => field.section === 'banking')

export const FIELD_ROWS = {
  personal: [
    ['username', 'email'],
    ['phone', 'full_name'],
    ['birth_date']
  ],
  security: [
    ['password', 'password_confirm']
  ],
  crypto: [
    ['eth_wallet_address']
  ],
  banking: [
    ['bank_account_number', 'bank_bik'],
    ['bank_card_number']
  ]
}
