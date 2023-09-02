import AuthActions from 'store/actions/auth';
import { AuthState } from '../states/AuthState';

type AuthAction = { type: keyof typeof AuthActions; payload: AuthState };

export default AuthAction;
