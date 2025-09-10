import React from 'react';
import type { PaymentCreateResponse } from '../types';

interface PaymentResultProps {
  result: PaymentCreateResponse;
  onReset: () => void;
}

export const PaymentResult: React.FC<PaymentResultProps> = ({ result }) => {
  return (
    <div className="payment-result">
      <div className="result-content">
        <div className="success-icon">✓</div>
        <h3 className="result-title">Платеж создан успешно!</h3>
        <p className="result-description">
          Для завершения оплаты перейдите по ссылке ниже:
        </p>
        
        <div className="payment-link-container">
          <a
            href={result.confirmation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="payment-link"
          >
            Перейти на страницу оплаты
          </a>
        </div>
      </div>
    </div>
  );
};
