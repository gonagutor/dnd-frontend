import AuthActions from 'common/store/actions/auth';
import { User } from 'common/models/user.model';

export type AuthAction = {
  type: keyof typeof AuthActions;
  payload: {
    email?: string;
    password?: string;
    user?: User;
    rememberMe?: boolean;
    error?: string;
  };
};
