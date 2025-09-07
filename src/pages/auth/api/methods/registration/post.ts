import {
  RegisterNewUser
} from './components'

import type { 
  RegistrationFormData, 
  RegistrationResponse
} from '../../../types'


export class PostRegistrationAPI {
  static async register_new_user(data: RegistrationFormData): Promise<RegistrationResponse> {
    return RegisterNewUser.registrator(data)
  }
}