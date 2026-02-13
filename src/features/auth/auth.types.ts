export interface User {
  id: string;
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextValue {
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
}
