import { User } from '../User';

export type AuthState = {
  isLoggedIn: boolean;
  pending?: boolean;
  error?: string;
  user?: User;
  refreshToken?: string;
  accessToken?: string;
};
