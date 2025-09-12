import type { PaymentCreateRequest, PaymentCreateResponse } from '../types';

const API_BASE_URL = 'http://0.0.0.0:4352';

export const createPayment = async (
  paymentData: PaymentCreateRequest
): Promise<PaymentCreateResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pay/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PaymentCreateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// NOT IMPLEMENTED