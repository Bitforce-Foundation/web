// Конфигурация секций формы
export interface SectionConfig {
  id: string
  title: string
  subtitle?: string
}

export const FORM_SECTIONS: SectionConfig[] = [
  {
    id: 'personal',
    title: 'Основная информация'
  },
  {
    id: 'security',
    title: 'Безопасность'
  },
  {
    id: 'crypto',
    title: 'Криптокошелек',
    subtitle: 'Укажите адрес вашего Ethereum кошелька для зачисления/перечисления цифровых активов.'
  },
  {
    id: 'banking',
    title: 'Банковские данные',
    subtitle: 'Данные необходимы для зачисления/перечисления рублевых средств. Указывайте только свои банковские реквизиты во избежание блокировки аккаунта.'
  }
]

// Тексты для страницы
export const PAGE_TEXTS = {
  header: {
    title: 'Регистрация',
    subtitle: 'Заполните все поля для создания аккаунта'
  },
  success: {
    message: 'Ваш аккаунт создан. Теперь вы можете перейти к этапам верификации.',
    buttonText: 'Перейти в Личный кабинет'
  },
  submit: {
    loadingText: 'Регистрация...',
    defaultText: 'Зарегистрироваться'
  }
}

// CSS классы
export const CSS_CLASSES = {
  page: 'registration-page',
  container: 'registration-container',
  header: 'registration-header',
  form: 'registration-form',
  actions: 'registration-actions',
  submit: 'registration-submit',
  formRow: 'form-row'
}
