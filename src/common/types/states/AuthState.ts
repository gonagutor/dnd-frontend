import { User } from 'common/models/user.model';

export type AuthState = {
  isLoggedIn: boolean;
  pending?: boolean;
  error?: string;
  user?: User;
  refreshToken?: string;
  accessToken?: string;
};
