import AuthActions from 'store/actions/auth';
import { User } from 'types/User';

export type AuthAction = {
  type: keyof typeof AuthActions;
  payload: {
    email?: string;
    password?: string;
    user?: User;
    refreshToken?: string;
    accessToken?: string;
    rememberMe?: boolean;
    error?: string;
  };
};
