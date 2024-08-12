import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import AuthActions from 'store/actions/auth';
import { AuthAction } from 'types/actions';
import { request } from 'utils/axios';
import constants from 'utils/constants';
import { saveCredentials, clearCredentials } from 'utils/credentials';

const login = (email: string, password: string) =>
  request.post(constants.ENDPOINTS.login, { email, password });

function* loginSaga(action: AuthAction) {
  const { email, password, rememberMe } = action.payload;
  if (!email || !password) {
    console.log('Badly implemented login Saga', action);
    return yield put({
      type: AuthActions.LOGIN_FAILURE,
      payload: {
        error: 'BAD_IMPLEMENTATION',
      },
    });
  }

  try {
    const response: AxiosResponse<any, any> = yield call(
      login,
      email,
      password,
    );

    saveCredentials(
      response.data.data.accessToken,
      response.data.data.refreshToken,
      response.data.data.user,
      rememberMe,
    );

    yield put({
      type: AuthActions.LOGIN_SUCCESS,
      payload: {
        user: response.data.data.user,
      },
    });
  } catch (e: any) {
    clearCredentials();
    yield put({
      type: AuthActions.LOGIN_FAILURE,
      payload: { error: e.response?.data.error || 'CONNECTION_ERROR' },
    });
  }
}

export function* authSaga() {
  yield all([takeLatest(AuthActions.LOGIN, loginSaga)]);
}
