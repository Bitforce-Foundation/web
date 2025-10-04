export interface PaymentCreateRequest {
  amount: {
    value: number;
  };
  description: {
    user_id: string;
  };
}

export interface PaymentCreateResponse {
  success: boolean;
  message: string;
  payment_id: string;
  confirmation_url: string;
  status: string;
}

export interface PaymentFormData {
  amount: string;
  operation: 'buy' | 'sell';
  currency: string;
}

export interface User {
  id: string
}