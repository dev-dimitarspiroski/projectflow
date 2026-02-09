export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
