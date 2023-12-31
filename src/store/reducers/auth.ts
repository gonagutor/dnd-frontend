import AuthActions from 'store/actions/auth';
import { AuthAction } from 'types/actions';
import { AuthState } from 'types/states';
import {
  clearCredentials,
  getAccessToken,
  getRefreshToken,
  getUser,
} from 'utils/credentials';

const generateDefaultState = (): AuthState => {
  const user = getUser();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (user && accessToken && refreshToken) {
    return {
      isLoggedIn: true,
      user,
      accessToken,
      refreshToken,
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
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accessToken,
      };

    case (AuthActions.REFRESH_TOKEN_REVOKED, AuthActions.LOGOUT):
      return {
        ...state,
        isLoggedIn: false,
        pending: false,
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
      };
    case AuthActions.TOKEN_NEEDS_REFRESH:
      return {
        ...state,
        pending: true,
        accessToken: undefined,
      };
    case AuthActions.TOKEN_REFRESHED:
      return {
        ...state,
        pending: false,
        accessToken: action.payload.accessToken,
      };

    default:
      return state;
  }
};

export default authReducer;
