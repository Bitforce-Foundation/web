import './SecuritySettings.css'
import type { SecuritySettingsProps } from '../types'
import { Card, StatusBadge } from '../../common'

const SecuritySettings = ({ 
  isTwoFactorEnabled, 
  lastPasswordChange, 
  onToggleTwoFactor, 
  onChangePassword, 
  className = '' 
}: SecuritySettingsProps) => {
  return (
    <Card className={`security-settings ${className}`}>
      <div className="security-settings__item">
        <div className="security-settings__info">
          <div className="security-settings__title">
            Двухфакторная аутентификация
          </div>
          <div className="security-settings__description">
            Дополнительная защита вашего аккаунта
          </div>
        </div>
        
        <div className="security-settings__status">
          <StatusBadge 
            status={isTwoFactorEnabled ? 'completed' : 'pending'}
            size="sm"
          />
          <span className="security-settings__status-text">
            {isTwoFactorEnabled ? 'Включена' : 'Отключена'}
          </span>
          
          <button 
            className="security-settings__toggle-btn"
            onClick={onToggleTwoFactor}
          >
            {isTwoFactorEnabled ? 'Отключить' : 'Включить'}
          </button>
        </div>
      </div>

      <div className="security-settings__divider" />

      <div className="security-settings__item">
        <div className="security-settings__info">
          <div className="security-settings__title">
            Пароль
          </div>
          <div className="security-settings__description">
            Последнее изменение: {lastPasswordChange}
          </div>
        </div>
        
        <div className="security-settings__actions">
          <button 
            className="security-settings__change-btn"
            onClick={onChangePassword}
          >
            <span className="material-icons">lock</span>
            Изменить пароль
          </button>
        </div>
      </div>

      <div className="security-settings__divider" />

      <div className="security-settings__item">
        <div className="security-settings__info">
          <div className="security-settings__title">
            Активные сессии
          </div>
          <div className="security-settings__description">
            Управление устройствами и сессиями
          </div>
        </div>
        
        <div className="security-settings__actions">
          <button className="security-settings__sessions-btn">
            <span className="material-icons">devices</span>
            Просмотреть сессии
          </button>
        </div>
      </div>
    </Card>
  )
}

export default SecuritySettings
