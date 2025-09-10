import React from 'react';
import { PaymentForm } from './components/PaymentForm';
import { PaymentResult } from './components/PaymentResult';
import { usePayment, useCurrentUser } from './hooks';
import type { PaymentFormData } from './types';
import './Payments.css';

export const Payment: React.FC = () => {
  const { isLoading, error, paymentResult, submitPayment, resetPayment } = usePayment();
  const { user, isLoading: userLoading, error: userError } = useCurrentUser();

  const handleSubmit = async (formData: PaymentFormData) => {
    if (!user) {
      console.error('User data not available');
      return;
    }

    try {
      await submitPayment(formData, user);
    } catch (err) {
      console.error('Payment submission failed:', err);
    }
  };

  if (userLoading) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-content">
            <div className="loading-container">
              <p>Загрузка данных пользователя...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-content">
            <div className="error-container">
              <p className="error-text">
                {userError || 'Не удалось получить данные пользователя'}
              </p>
              <p className="error-text">
                Пожалуйста, войдите в систему для создания платежа.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1 className="payment-title">Создание платежа</h1>
          <p className="payment-subtitle">
            Заполните форму для создания нового платежа
          </p>
        </div>

        <div className="payment-content">
          {paymentResult ? (
            <PaymentResult result={paymentResult} onReset={resetPayment} />
          ) : (
            <>
              <PaymentForm onSubmit={handleSubmit} isLoading={isLoading} />
              {error && (
                <div className="error-container">
                  <p className="error-text">{error}</p>
                  <button onClick={resetPayment} className="retry-button">
                    Попробовать снова
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;