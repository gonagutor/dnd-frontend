import { all, call, put, takeLatest } from 'redux-saga/effects';
import { User } from 'services/user.service';
import UserTableActions from 'store/actions/userTable';
import { UserTableAction } from 'types/actions/UserTableAction';

function* initTableSaga(action: UserTableAction) {
  const { page } = action.payload;

  try {
    const data = yield call(User.getUsers, page || 1);
    yield put({
      type: UserTableActions.INIT_SUCCESS,
      payload: {
        users: data.users,
        page: data.pagination.page,
        maxPages: data.pagination.maxPages,
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserTableActions.INIT_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

function* nextPage(action: UserTableAction) {
  const { page, maxPages } = action.payload;

  if ((page ?? 1) > (maxPages ?? 1)) {
    return yield put({
      type: UserTableActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserTableActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* prevPage(action: UserTableAction) {
  const { page } = action.payload;

  if ((page ?? 1) <= 0) {
    return yield put({
      type: UserTableActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserTableActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* selectPage(action: UserTableAction) {
  const { page, maxPages } = action.payload;

  if ((page ?? 1) > (maxPages ?? 1) || (page ?? 1) <= 0) {
    return yield put({
      type: UserTableActions.PAGINATION_FAILURE,
      payload: {
        error: 'No more pages',
      },
    });
  }

  yield put({
    type: UserTableActions.INIT_TABLE,
    payload: {
      page: page ?? 1,
    },
  });
}

function* deleteUser(action: UserTableAction) {
  const { id, users } = action.payload;
  if (!id || id === undefined) {
    return yield put({
      type: UserTableActions.DELETE_USER_FAILURE,
      payload: {
        error: 'No user id provided',
      },
    });
  }

  try {
    yield call(User.deleteUser, id);

    const newUsers = users?.filter(user => user.id !== id) ?? [];

    yield put({
      type: UserTableActions.INIT_TABLE,
      payload: {
        users: newUsers,
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserTableActions.DELETE_USER_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

function* updateUserState(action: UserTableAction) {
  const { id, isActive, users } = action.payload;

  if (!id || id === undefined || isActive === undefined) {
    return yield put({
      type: UserTableActions.UPDATE_USER_FAILURE,
      payload: {
        error: 'No user id provided or isActive is not defined',
      },
    });
  }

  try {
    yield call(User.updateUserState, id, isActive);

    const newUsers = users?.map(user =>
      user.id === id ? { ...user, isActive } : user,
    );

    yield put({
      type: UserTableActions.INIT_TABLE,
      payload: {
        users: newUsers,
      },
    });
  } catch (error: unknown) {
    yield put({
      type: UserTableActions.UPDATE_USER_FAILURE,
      payload: {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    });
  }
}

export function* userTableSaga() {
  yield all([
    takeLatest(UserTableActions.INIT_TABLE, initTableSaga),
    takeLatest(UserTableActions.NEXT_PAGE, nextPage),
    takeLatest(UserTableActions.PREV_PAGE, prevPage),
    takeLatest(UserTableActions.SELECT_PAGE, selectPage),
    takeLatest(UserTableActions.DELETE_USER, deleteUser),
    takeLatest(UserTableActions.UPDATE_USER, updateUserState),
  ]);
}
