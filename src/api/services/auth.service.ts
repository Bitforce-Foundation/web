// src/api/services/auth.service.ts
import { createAxios } from "../config/axios";
import { getAuthBaseUrl } from "../config/url";

const authApi = createAxios(getAuthBaseUrl(), true);

// Health check: GET /api/v1/common/health
export async function authCheckHealth() {
  const res = await authApi.get("/common/health");
  return res.data as { status: string; service: string; version: string };
}

// Registration: POST /api/v1/registration/initial
export type RegistrationInitialRequest = {
  username: string;
  email: string;
  phone: string;
  full_name: string;
  birth_date: string; // YYYY-MM-DD
  eth_wallet_address: string;
  bank_account_number: string;
  bank_card_number: string;
  password: string;
  password_confirm: string;
};

export async function registrationInitial(payload: RegistrationInitialRequest) {
  const res = await authApi.post("/registration/initial", payload);
  return res.data as { message: string; user_id: string; next_step: string };
}

// Get Registration User: GET /api/v1/registration/user/{user_id}
export async function getRegistrationUser(userId: string) {
  const res = await authApi.get(`/registration/user/${userId}`);
  return res.data as Record<string, unknown>;
}

// Login: POST /api/v1/auth/login
export async function authLogin(username: string, password: string) {
  const res = await authApi.post("/auth/login", { username, password });
  return res.data as { user_id?: string; status: boolean };
}

// Session: POST /api/v1/session/create
export async function sessionCreate(params: { user_id: string; ip_address: string; user_agent: string }) {
  const res = await authApi.post("/session/create", params);
  return res.data as { access_token: string; refresh_token: string; token_type: string; expires_in: number; session_id: string };
}

// Session: POST /api/v1/session/update_last_seen
export async function sessionUpdateLastSeen(query: { session_id: string; ip_address?: string | null; user_agent?: string | null }) {
  const res = await authApi.post("/session/update_last_seen", undefined, { params: query });
  return res.data as Record<string, unknown>;
}

// Session: POST /api/v1/session/refresh
export async function sessionRefresh(body: { refresh_token: string; ip_address: string; user_agent: string }) {
  const res = await authApi.post("/session/refresh", body);
  return res.data as { access_token: string; refresh_token: string; token_type: string; expires_in: number; session_id: string };
}

// Session: POST /api/v1/session/validate
export async function sessionValidate(body: { session_id: string; jti: string }) {
  const res = await authApi.post("/session/validate", body);
  return res.data as { is_valid: boolean; session?: Record<string, unknown>; reason?: string };
}

// Session: POST /api/v1/session/revoke
export async function sessionRevoke(body: { session_id: string; reason?: string }) {
  const res = await authApi.post("/session/revoke", body);
  return res.data as { message: string; session_id: string; revoked_at: string };
}

// Session: GET /api/v1/session/{session_id}
export async function getSessionById(sessionId: string) {
  const res = await authApi.get(`/session/${sessionId}`);
  return res.data as Record<string, unknown>;
}

// Utility: attach access token to a specific call
export function withAccessToken(headers: Record<string, string> | undefined, accessToken?: string) {
  if (!accessToken) return headers;
  return { ...(headers || {}), Authorization: `Bearer ${accessToken}` };
}
