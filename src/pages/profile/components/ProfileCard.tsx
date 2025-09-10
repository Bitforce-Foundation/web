import React from 'react'
import type { UserInfoResponse, SessionInfo } from '../../registration/types'

interface ProfileCardProps {
  userInfo: UserInfoResponse
  sessionInfo: SessionInfo | null
  onLogout: () => void
  onRefresh: () => Promise<void>
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userInfo,
  sessionInfo,
  onLogout,
  onRefresh,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    if (!status) return 'status-default'
    
    switch (status.toLowerCase()) {
      case 'active':
      case 'активный':
        return 'status-active'
      case 'pending':
      case 'в ожидании':
        return 'status-pending'
      case 'blocked':
      case 'заблокирован':
        return 'status-blocked'
      default:
        return 'status-default'
    }
  }

  const getKycStatusColor = (status: string) => {
    if (!status) return 'kyc-default'
    
    switch (status.toLowerCase()) {
      case 'verified':
      case 'проверен':
        return 'kyc-verified'
      case 'pending':
      case 'на проверке':
        return 'kyc-pending'
      case 'rejected':
      case 'отклонен':
        return 'kyc-rejected'
      default:
        return 'kyc-default'
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Профиль пользователя</h1>
        <div className="profile-actions">
          <button onClick={onRefresh} className="refresh-button">
            Обновить
          </button>
          <button onClick={onLogout} className="logout-button">
            Выйти
          </button>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <h2 className="section-title">Основная информация</h2>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Имя пользователя:</label>
              <span className="info-value">{userInfo.username}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">ФИО:</label>
              <span className="info-value">{userInfo.full_name}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Email:</label>
              <span className="info-value">{userInfo.email}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Телефон:</label>
              <span className="info-value">{userInfo.phone}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Дата рождения:</label>
              <span className="info-value">{formatDate(userInfo.birth_date)}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Статус</h2>
          <div className="status-grid">
            <div className="status-item">
              <label className="info-label">Статус аккаунта:</label>
              <span className={`status-badge ${getStatusColor(userInfo.status || 'INITIAL')}`}>
                {userInfo.status || 'INITIAL'}
              </span>
            </div>
            
            <div className="status-item">
              <label className="info-label">KYC статус:</label>
              <span className={`status-badge ${getKycStatusColor(userInfo.kyc_status)}`}>
                {userInfo.kyc_status}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Финансовая информация</h2>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Ethereum кошелек:</label>
              <span className="info-value crypto-address">{userInfo.eth_wallet_address}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Номер банковского счета:</label>
              <span className="info-value">{userInfo.bank_account_number}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">БИК банка:</label>
              <span className="info-value">{userInfo.bank_bik}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Номер банковской карты:</label>
              <span className="info-value">
                {userInfo.bank_card_number.replace(/(\d{4})(?=\d)/g, '$1 ')}
              </span>
            </div>
          </div>
        </div>

        {sessionInfo && (
          <div className="profile-section">
            <h2 className="section-title">Информация о сессии</h2>
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">ID сессии:</label>
                <span className="info-value session-id">{sessionInfo.id}</span>
              </div>
              
              <div className="info-item">
                <label className="info-label">Последняя активность:</label>
                <span className="info-value">{formatDateTime(sessionInfo.last_seen_at)}</span>
              </div>
              
              <div className="info-item">
                <label className="info-label">Истекает:</label>
                <span className="info-value">{formatDateTime(sessionInfo.expires_at)}</span>
              </div>
              
              <div className="info-item">
                <label className="info-label">IP-адрес:</label>
                <span className="info-value">{sessionInfo.ip_address}</span>
              </div>
            </div>
          </div>
        )}

        <div className="profile-section">
          <h2 className="section-title">Даты</h2>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Дата создания:</label>
              <span className="info-value">{formatDateTime(userInfo.created_at)}</span>
            </div>
            
            <div className="info-item">
              <label className="info-label">Последнее обновление:</label>
              <span className="info-value">{formatDateTime(userInfo.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
