import { AxiosError, AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import AuthActions from 'store/actions/auth';
import { AuthAction } from 'types/actions';
import { request } from 'utils/axios';

const login = (email: string, password: string) =>
  request.post('/login', { email, password });

function* loginSaga(action: AuthAction) {
  if (
    !action.payload.login ||
    !action.payload.login.password ||
    !action.payload.login.email
  ) {
    console.log('Saga login called with incorrect payload');
    return yield put({
      type: AuthActions.LOGIN_FAILURE,
      payload: { error: 'IMPLEMENTATION_ERROR' },
    });
  }

  try {
    const response: AxiosResponse<any, any> = yield call(
      login,
      action.payload.login.email,
      action.payload.login.password,
    );

    yield put({
      type: AuthActions.LOGIN_SUCCESS,
      payload: {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
        user: response.data.data.user,
      },
    });
  } catch (e: any | AxiosError) {
    yield put({
      type: AuthActions.LOGIN_FAILURE,
      error: e.response?.data.error || 'CONNECTION_ERROR',
    });
  }
}

const refreshToken = (refreshToken: string) =>
  request.post(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

function* needsRefreshSaga(action: AuthAction) {
  if (!action.payload.refreshToken) {
    console.log('Saga needsRefresh called with incorrect payload');
    return;
  }

  try {
    const response: AxiosResponse<any, any> = yield call(
      refreshToken,
      action.payload.refreshToken,
    );

    yield put({
      type: AuthActions.TOKEN_REFRESHED,
      payload: {
        accessToken: response.data.data.accessToken,
      },
    });
  } catch (e: any | AxiosError) {
    yield put({
      type: AuthActions.REFRESH_TOKEN_REVOKED,
      error: e.response?.data.error || 'CONNECTION_ERROR',
    });
  }
}

export function* authSaga() {
  yield all([
    takeLatest(AuthActions.LOGIN, loginSaga),
    takeLatest(AuthActions.TOKEN_NEEDS_REFRESH, needsRefreshSaga),
  ]);
}
