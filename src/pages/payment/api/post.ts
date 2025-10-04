import type { PaymentCreateRequest, PaymentCreateResponse } from '../types';
import { publicApiRequest } from '../../../utils/apiInterceptor';

const API_BASE_URL = 'http://0.0.0.0:4352';

export const createPayment = async (
  paymentData: PaymentCreateRequest
): Promise<PaymentCreateResponse> => {
  try {
    console.log('🔍 Отправка запроса на создание платежа:');
    console.log('URL:', `${API_BASE_URL}/pay/create`);
    console.log('Данные платежа:', JSON.stringify(paymentData, null, 2));

    const response = await publicApiRequest(`${API_BASE_URL}/pay/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    console.log('📡 Ответ сервера:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData, null, 2);
        console.error('❌ Детали ошибки сервера:', errorData);
        
        if (response.status === 422) {
          console.error('🔴 Ошибка валидации (422):');
          if (errorData.detail && Array.isArray(errorData.detail)) {
            errorData.detail.forEach((error: { loc?: string[]; msg?: string; input?: unknown }, index: number) => {
              console.error(`  ${index + 1}. Поле: ${error.loc?.join?.('.') || 'неизвестно'}`);
              console.error(`     Сообщение: ${error.msg || 'не указано'}`);
              console.error(`     Значение: ${error.input || 'не указано'}`);
            });
          }
          throw new Error(`Ошибка валидации: ${errorDetails}`);
        }
      } catch (parseError) {
        console.error('⚠️ Не удалось распарсить ошибку как JSON:', parseError);
        errorDetails = await response.text();
        console.error('Текст ошибки:', errorDetails);
      }
      
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
    }

    const data: PaymentCreateResponse = await response.json();
    console.log('✅ Платеж успешно создан:', data);
    return data;
  } catch (error) {
    console.error('💥 Error creating payment:', error);
    throw error;
  }
};

// NOT IMPLEMENTED