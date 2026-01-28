export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string | number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  user?: AuthUser;
  accessToken?: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user?: AuthUser;
}
