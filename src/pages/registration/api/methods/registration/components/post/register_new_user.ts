import {
  BASE_URL,
  initialRegistrationEP,
  createAuthHeaders
} from '../../../../components/url'

import type { 
  RegistrationFormData, 
  RegistrationResponse
} from '../../../../../types'

export class RegisterNewUser {
    static async registrator(data: RegistrationFormData): Promise<RegistrationResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}${initialRegistrationEP}`, 
        {
          method: 'POST',
          headers: createAuthHeaders('x-api-key'),
          body: JSON.stringify(data)
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        
        if (response.status === 422) {
          const details = errorData.detail || []
          const errorMessages = details.map((error: { loc: (string | number)[], msg: string }) => 
            `${error.loc.join('.')}: ${error.msg}`
          ).join('; ')
          throw new Error(`Ошибка валидации: ${errorMessages}`)
        } else if (response.status === 409) {
          throw new Error(errorData.message || 'Пользователь с такими данными уже существует')
        } else {
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
      }

      const result = await response.json()
      return result
    } catch (error) {
      
      if (error instanceof TypeError && (error as TypeError).message.includes('fetch')) {
        throw new Error(`Сетевая ошибка: Не удается подключиться к серверу ${BASE_URL}. Проверьте подключение к интернету.`)
      }
      
      if (error instanceof Error) {
        throw error
      }
      
      throw new Error('Неизвестная ошибка при регистрации. Обратитесь в поддержку.')
    }
  }
}