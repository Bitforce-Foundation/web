import type {
    RegistrationFormData,
} from '../types'

export {
    initialFormData
}

const initialFormData: RegistrationFormData = {
  username: '',
  email: '',
  phone: '',
  full_name: '',
  birth_date: '',
  eth_wallet_address: '',
  bank_account_number: '',
  bank_card_number: '',
  password: '',
  password_confirm: ''
}