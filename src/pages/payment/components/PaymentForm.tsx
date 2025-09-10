import React, { useState } from 'react';
import type { PaymentFormData } from '../types';

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  isLoading: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: '',
    operation: 'buy',
    currency: 'USDT',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Введите корректную сумму';
    }

    if (!formData.currency) {
      newErrors.currency = 'Выберите валюту';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="operation" className="form-label">
          Операция
        </label>
        <select
          id="operation"
          value={formData.operation}
          onChange={(e) => handleInputChange('operation', e.target.value)}
          className="form-select"
          disabled={isLoading}
        >
          <option value="buy">Купить</option>
          <option value="sell">Продать</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="currency" className="form-label">
          Валюта
        </label>
        <select
          id="currency"
          value={formData.currency}
          onChange={(e) => handleInputChange('currency', e.target.value)}
          className={`form-select ${errors.currency ? 'error' : ''}`}
          disabled={isLoading}
        >
          <option value="USDT">USDT</option>
        </select>
        {errors.currency && <span className="error-message">{errors.currency}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="amount" className="form-label">
          Сумма
        </label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          placeholder="Введите сумму"
          className={`form-input ${errors.amount ? 'error' : ''}`}
          disabled={isLoading}
          min="0"
          step="0.01"
        />
        {errors.amount && <span className="error-message">{errors.amount}</span>}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Создание платежа...' : 'Создать платеж'}
      </button>
    </form>
  );
};
