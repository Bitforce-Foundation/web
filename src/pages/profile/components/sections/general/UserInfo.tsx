import './UserInfo.css'
import type { UserInfoProps } from '../types'
import { Card } from '../../common'

const UserInfo = ({ 
  name, 
  email, 
  phone, 
  registrationDate, 
  lastLogin, 
  avatar, 
  className = '' 
}: UserInfoProps) => {
  return (
    <Card className={`user-info ${className}`}>
      <div className="user-info__avatar">
        {avatar ? (
          <img src={avatar} alt={name} className="user-info__avatar-image" />
        ) : (
          <div className="user-info__avatar-placeholder">
            <span className="material-icons">person</span>
          </div>
        )}
      </div>

      <div className="user-info__details">
        <div className="user-info__field">
          <label className="user-info__label">Имя</label>
          <span className="user-info__value">{name}</span>
        </div>

        <div className="user-info__field">
          <label className="user-info__label">Email</label>
          <span className="user-info__value">{email}</span>
        </div>

        <div className="user-info__field">
          <label className="user-info__label">Телефон</label>
          <span className="user-info__value">{phone}</span>
        </div>

        <div className="user-info__field">
          <label className="user-info__label">Дата регистрации</label>
          <span className="user-info__value">{registrationDate}</span>
        </div>

        <div className="user-info__field">
          <label className="user-info__label">Последний вход</label>
          <span className="user-info__value">{lastLogin}</span>
        </div>
      </div>

      <div className="user-info__actions">
        <button className="user-info__edit-btn">
          <span className="material-icons">edit</span>
          Редактировать
        </button>
      </div>
    </Card>
  )
}

export default UserInfo
