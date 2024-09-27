import AuthActions from 'common/store/actions/auth';
import { AuthAction } from 'common/types/actions';
import { AuthState } from 'common/types/states';
import {
  clearCredentials,
  getAccessToken,
  getRefreshToken,
  getUser,
} from 'common/utils/credentials';

const generateDefaultState = (): AuthState => {
  const user = getUser();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (user && accessToken && refreshToken) {
    return {
      isLoggedIn: true,
      user,
    };
  }

  clearCredentials();
  return {
    isLoggedIn: false,
  };
};

const authReducer = (
  state = generateDefaultState(),
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoggedIn: false,
        pending: true,
        error: undefined,
      };
    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        pending: false,
        error: action.payload.error,
      };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        pending: false,
        error: undefined,
        user: action.payload.user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        pending: false,
        user: undefined,
      };

    default:
      return state;
  }
};

export default authReducer;
