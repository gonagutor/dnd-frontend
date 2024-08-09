import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userTableSaga } from './userTable';

export function* rootSaga() {
  yield all([fork(authSaga), fork(userTableSaga)]);
}
