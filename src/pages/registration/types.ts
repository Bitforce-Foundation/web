export interface RegistrationFormData {
  username: string
  email: string
  phone: string
  full_name: string
  birth_date: string
  eth_wallet_address: string
  bank_account_number: string
  bank_card_number: string
  password: string
  password_confirm: string
}

export interface UserId {
  user_id: string
}

export interface UserInfoResponse {
  username: string
  email: string
  phone: string
  full_name: string
  birth_date: string
  eth_wallet_address: string
  bank_account_number: string
  bank_card_number: string
  kyc_status: string
  created_at: string
  updated_at: string
}

export interface RegistrationResponse {
  message: string
  user_id: string
  next_step: string
}

export interface RegistrationError {
  error: string
  message: string
  details?: Record<string, unknown>
}

export interface ValidationError {
  detail: Array<{
    loc: (string | number)[]
    msg: string
    type: string
  }>
}

export interface FormErrors {
  username?: string
  email?: string
  phone?: string
  full_name?: string
  birth_date?: string
  eth_wallet_address?: string
  bank_account_number?: string
  bank_card_number?: string
  password?: string
  password_confirm?: string
  general?: string
}

export interface RegistrationProps {
  onSuccess?: (response: RegistrationResponse, session?: SessionResponse) => void
  onError?: (error: string) => void
}

export interface RegistrationWithSessionResult {
  registration: RegistrationResponse
  session: SessionResponse
}

export interface SessionId {
  session_id: string
}

export interface SessionCreateData {
  user_id: string
  ip_address?: string | null
  user_agent?: string | null
}

export interface SessionResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  session_id: string
}

export interface SessionError {
  detail: string
}

export interface SessionProps {
  onSuccess?: (response: SessionResponse) => void
  onError?: (error: string) => void
}

export interface RefreshTokenData {
  refresh_token: string
  ip_address?: string
  user_agent?: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  session_id: string
}

export interface SessionValidateData {
  session_id: string
  jti: string
}

export interface SessionInfo {
  id: string
  user_id: string
  jti: string
  family_id: string
  replaced_by: string | null
  expires_at: string
  revoked_at: string | null
  last_seen_at: string
  ip_address: string
  user_agent: string
  created_at: string
  updated_at: string
}

export interface SessionValidateResponse {
  is_valid: boolean
  session: SessionInfo
  reason: string
}

export interface SessionRevokeData {
  session_id: string
  reason?: string
}

export interface SessionRevokeResponse {
  message: string
  session_id: string
  revoked_at: string
}

export interface UserSessionsParams {
  user_id: string
  active_only?: boolean
  limit?: number
  offset?: number
}

export interface UserSessionsResponse {
  sessions: SessionInfo[]
  total: number
  limit: number
  offset: number
}

export interface RevokeAllSessionsParams {
  user_id: string
  exclude_session_id?: string
}

export interface SessionApiError {
  error: string
  message: string
  session_id?: string
}
