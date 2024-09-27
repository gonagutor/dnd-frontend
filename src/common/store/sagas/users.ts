import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UserService } from 'common/services/user.service';
import UserActions from 'common/store/actions/users';
import { UserAction } from 'common/types/actions/UserTableAction';

function* initTableSaga(action: UserAction) {
  const { page, key, sortOrder } = action.payload;

  try {
    const data = yield call(UserService.getMany, page ?? 1, key, sortOrder);
    yield put({
      type: UserActions.INIT_SUCCESS,
      payload: {
        users: data.users,
        page: data.pagination.page,
        maxPages: data.pagination.maxPages,
        key: key ?? 'created_at',
        sortOrder: sortOrder ?? 'DESC',
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserActions.INIT_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

function* nextPage(action: UserAction) {
  const { page, maxPages } = action.payload;

  if ((page ?? 1) > (maxPages ?? 1)) {
    return yield put({
      type: UserActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* prevPage(action: UserAction) {
  const { page } = action.payload;

  if ((page ?? 1) <= 0) {
    return yield put({
      type: UserActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* selectPage(action: UserAction) {
  const { page, maxPages } = action.payload;

  if ((page ?? 1) > (maxPages ?? 1) || (page ?? 1) <= 0) {
    return yield put({
      type: UserActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* deleteUser(action: UserAction) {
  const { id, users } = action.payload;
  if (!id || id === undefined) {
    return yield put({
      type: UserActions.DELETE_USER_FAILURE,
      payload: {
        error: 'No user id provided',
      },
    });
  }

  try {
    yield call(UserService.getOne, id);

    const newUsers = users?.filter(user => user.id !== id) ?? [];

    yield put({
      type: UserActions.INIT_TABLE,
      payload: {
        users: newUsers,
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserActions.DELETE_USER_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

function* updateUserState(action: UserAction) {
  const { id, isActive, users } = action.payload;

  if (!id || id === undefined || isActive === undefined) {
    return yield put({
      type: UserActions.UPDATE_USER_FAILURE,
      payload: {
        error: 'No user id provided or isActive is not defined',
      },
    });
  }

  try {
    yield call(UserService.updateUserState, id, isActive);

    const newUsers = users?.map(user =>
      user.id === id ? { ...user, isActive } : user,
    );

    yield put({
      type: UserActions.INIT_TABLE,
      payload: {
        users: newUsers,
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserActions.UPDATE_USER_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

export function* userSaga() {
  yield all([
    takeLatest(UserActions.INIT_TABLE, initTableSaga),
    takeLatest(UserActions.NEXT_PAGE, nextPage),
    takeLatest(UserActions.PREV_PAGE, prevPage),
    takeLatest(UserActions.SELECT_PAGE, selectPage),
    takeLatest(UserActions.DELETE_USER, deleteUser),
    takeLatest(UserActions.UPDATE_USER, updateUserState),
  ]);
}
