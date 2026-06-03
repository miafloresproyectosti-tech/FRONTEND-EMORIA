import { apiRequest, clearApiToken, setApiToken } from "./apiClient";
import type { AvatarProfile, UserGender, UserRole } from "../auth/types";

export interface ApiUser {
  id?: number | string;
  name?: string;
  username?: string;
  email?: string;
  role?: UserRole;
  gender?: UserGender;
  avatar?: AvatarProfile;
  created_at?: string;
  updated_at?: string;
}

export interface AuthSession {
  token: string;
  user: ApiUser;
}

export interface RegisterRequest {
  name?: string;
  username?: string;
  identifier?: string;
  email?: string;
  password: string;
  password_confirmation?: string;
  role?: UserRole;
  gender?: UserGender;
}

export interface LoginRequest {
  username?: string;
  identifier?: string;
  email?: string;
  password: string;
}

type AuthResponse = {
  token?: string;
  access_token?: string;
  user?: ApiUser;
  data?: {
    token?: string;
    access_token?: string;
    user?: ApiUser;
  };
};

function normalizeAuthResponse(response: AuthResponse): AuthSession {
  const token = response.token ?? response.access_token ?? response.data?.token ?? response.data?.access_token;
  const user = response.user ?? response.data?.user;

  if (!token || !user) {
    throw new Error("AUTH_RESPONSE_INVALID");
  }

  setApiToken(token);
  return { token, user };
}

export async function register(payload: RegisterRequest): Promise<AuthSession> {
  const response = await apiRequest<AuthResponse>("/register", {
    method: "POST",
    body: payload,
    token: null,
  });

  return normalizeAuthResponse(response);
}

export async function login(payload: LoginRequest): Promise<AuthSession> {
  const response = await apiRequest<AuthResponse>("/login", {
    method: "POST",
    body: payload,
    token: null,
  });

  return normalizeAuthResponse(response);
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<unknown>("/logout", {
      method: "POST",
    });
  } finally {
    clearApiToken();
  }
}
