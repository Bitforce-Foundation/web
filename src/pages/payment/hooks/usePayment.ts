import { useState } from 'react';
import { createPayment } from '../api/post';
import type { PaymentCreateRequest, PaymentCreateResponse, PaymentFormData, User } from '../types';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentCreateResponse | null>(null);

  const submitPayment = async (formData: PaymentFormData, user: User) => {
    setIsLoading(true);
    setError(null);
    setPaymentResult(null);

    try {
      const paymentRequest: PaymentCreateRequest = {
        amount: {
          value: parseFloat(formData.amount),
        },
        description: {
          user_id: user.id
        }
      };

      const result = await createPayment(paymentRequest);
      setPaymentResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при создании платежа';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPayment = () => {
    setError(null);
    setPaymentResult(null);
  };

  return {
    isLoading,
    error,
    paymentResult,
    submitPayment,
    resetPayment,
  };
};
