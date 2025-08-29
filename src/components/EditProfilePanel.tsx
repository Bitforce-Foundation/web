import React, { useState, useEffect } from 'react';
import './components.css';

interface UserInfo {
  fullName: string;
  nickname: string;
  email: string;
  phone: string;
  currency: string;
  walletAddress: string;
  passportId: string;
}

interface EditProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  onSave: (updatedInfo: UserInfo) => void;
}

const EditProfilePanel: React.FC<EditProfilePanelProps> = ({
  isOpen,
  onClose,
  userInfo,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nickname: userInfo.nickname,
    email: userInfo.email,
    phone: userInfo.phone
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({
      ...userInfo,
      ...formData
    });
  };

  // Блокируем скролл основной страницы при открытой панели
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      
      // Блокируем скролл
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Восстанавливаем скролл при закрытии
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="edit-profile-overlay" onClick={onClose}>
      <div className="edit-profile-panel" onClick={(e) => e.stopPropagation()}>
        <div className="edit-profile-header">
          <h2>Редактирование профиля</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <form className="edit-profile-form">
          <div className="form-group">
            <label>
              <span className="material-icons">person</span>
              ФИО
            </label>
            <input
              type="text"
              value={userInfo.fullName}
              disabled
              className="disabled"
            />
            <small>ФИО нельзя изменить</small>
          </div>

          <div className="form-group">
            <label>
              <span className="material-icons">badge</span>
              Паспорт
            </label>
            <input
              type="text"
              value={userInfo.passportId}
              disabled
              className="disabled"
            />
            <small>Паспортные данные нельзя изменить</small>
          </div>

          <div className="form-group">
            <label>
              <span className="material-icons">account_balance_wallet</span>
              Кошелек
            </label>
            <input
              type="text"
              value={userInfo.walletAddress}
              disabled
              className="disabled"
            />
            <small>Адрес кошелька нельзя изменить</small>
          </div>

          <div className="form-group">
            <label>
              <span className="material-icons">alternate_email</span>
              Никнейм
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Введите никнейм"
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-icons">email</span>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите email"
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-icons">phone</span>
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Введите телефон"
            />
          </div>
        </form>

        <div className="edit-profile-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Отмена
          </button>
          <button type="button" className="save-btn" onClick={handleSubmit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePanel;
