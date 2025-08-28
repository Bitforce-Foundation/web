import './GeneralSection.css'
import type { GeneralSectionProps } from '../types'
import Section from '../Section'
import UserInfo from './UserInfo'
import SecuritySettings from './SecuritySettings'

const GeneralSection = ({ className = '' }: GeneralSectionProps) => {
  // Mock data - в реальном приложении данные будут приходить из props или хуков
  const userInfo = {
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    registrationDate: '15 марта 2023',
    lastLogin: '2 часа назад'
  }

  const securitySettings = {
    isTwoFactorEnabled: true,
    lastPasswordChange: '30 дней назад'
  }

  const handleToggleTwoFactor = () => {
    console.log('Toggle 2FA')
  }

  const handleChangePassword = () => {
    console.log('Change password')
  }

  return (
    <div className={`general-section ${className}`}>
      <Section title="Информация о пользователе">
        <UserInfo {...userInfo} />
      </Section>

      <Section title="Безопасность">
        <SecuritySettings
          {...securitySettings}
          onToggleTwoFactor={handleToggleTwoFactor}
          onChangePassword={handleChangePassword}
        />
      </Section>
    </div>
  )
}

export default GeneralSection
