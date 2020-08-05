export interface UserAuthenticatedResponse {
  accessToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  authIsLoading: boolean;
}
