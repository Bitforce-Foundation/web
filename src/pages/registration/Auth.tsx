import { useNavigate } from 'react-router-dom'
import { useRegistrationForm } from './hooks'
import { FormSection, SuccessMessage, ErrorMessage, FieldRenderer } from './components'
import { formatPhoneNumber, formatCardNumber, formatBankAccount, formatBik } from './utils'
import Button from '../home/components/common/Button'
import Container from '../home/components/common/Container'
import type { RegistrationProps } from './types'
import { 
  FORM_SECTIONS, 
  PAGE_TEXTS, 
  CSS_CLASSES,
  PERSONAL_FIELDS,
  SECURITY_FIELDS,
  CRYPTO_FIELDS,
  BANKING_FIELDS
} from './data'
import './Auth.css'

const Registration: React.FC<RegistrationProps> = ({ onSuccess, onError }) => {
  const navigate = useNavigate()
  const {
    formData,
    errors,
    isLoading,
    isSuccess,
    updateField,
    submitForm,
    resetForm,
    clearGeneralError
  } = useRegistrationForm()

  // Обработчики для форматирования полей
  const formatHandlers = {
    phone: (value: string) => {
      const formatted = formatPhoneNumber(value)
      updateField('phone', formatted)
    },
    bank_card_number: (value: string) => {
      const formatted = formatCardNumber(value)
      updateField('bank_card_number', formatted)
    },
    bank_account_number: (value: string) => {
      const formatted = formatBankAccount(value)
      updateField('bank_account_number', formatted)
    },
    bank_bik: (value: string) => {
      const formatted = formatBik(value)
      updateField('bank_bik', formatted)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await submitForm()
    if (result) {
      // Передает и данные регистрации, и сессию
      onSuccess?.(result.registration, result.session)
    } else if (errors.general) {
      onError?.(errors.general)
    }
  }

  const handleGoToProfile = () => {
    navigate('/profile')
  }

  // Если регистрация успешна, показывает сообщение об успехе
  if (isSuccess) {
    return (
      <div className={CSS_CLASSES.page}>
        <Container maxWidth="md">
          <div className={CSS_CLASSES.container}>
            <SuccessMessage
              message={PAGE_TEXTS.success.message}
              onClose={resetForm}
            />
            <div className={CSS_CLASSES.actions}>
              <Button onClick={handleGoToProfile} variant="primary">
                {PAGE_TEXTS.success.buttonText}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className={CSS_CLASSES.page}>
      <Container maxWidth="md">
        <div className={CSS_CLASSES.container}>
          <div className={CSS_CLASSES.header}>
            <h1>{PAGE_TEXTS.header.title}</h1>
            <p>{PAGE_TEXTS.header.subtitle}</p>
          </div>

          {errors.general && (
            <ErrorMessage
              message={errors.general}
              onClose={clearGeneralError}
            />
          )}

          <form onSubmit={handleSubmit} className={CSS_CLASSES.form}>
            {FORM_SECTIONS.map((section) => {
              let sectionFields: typeof PERSONAL_FIELDS

              switch (section.id) {
                case 'personal':
                  sectionFields = PERSONAL_FIELDS
                  break
                case 'security':
                  sectionFields = SECURITY_FIELDS
                  break
                case 'crypto':
                  sectionFields = CRYPTO_FIELDS
                  break
                case 'banking':
                  sectionFields = BANKING_FIELDS
                  break
                default:
                  sectionFields = []
              }

              return (
                <FormSection
                  key={section.id}
                  title={section.title}
                  subtitle={section.subtitle}
                >
                  <FieldRenderer
                    sectionId={section.id}
                    fields={sectionFields}
                    formData={formData}
                    errors={errors}
                    updateField={updateField}
                    formatHandlers={formatHandlers}
                  />
                </FormSection>
              )
            })}

            <div className={CSS_CLASSES.actions}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className={CSS_CLASSES.submit}
              >
                {isLoading ? PAGE_TEXTS.submit.loadingText : PAGE_TEXTS.submit.defaultText}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Registration
