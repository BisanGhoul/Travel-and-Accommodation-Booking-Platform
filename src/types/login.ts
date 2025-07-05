export type UserRole = 'Admin' | 'User';

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  authentication: string;
  userType: UserRole;
}
