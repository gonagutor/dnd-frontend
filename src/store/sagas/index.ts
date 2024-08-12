import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userSaga } from './users';

export function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga)]);
}
