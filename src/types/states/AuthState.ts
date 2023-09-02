import { User } from '../User';

export type AuthState = {
  isLoggedIn: boolean;
  login?: { email: string; password: string; rememberMe?: boolean };
  pending?: boolean;
  error?: string;
  user?: User;
  refreshToken?: string;
  accessToken?: string;
};
