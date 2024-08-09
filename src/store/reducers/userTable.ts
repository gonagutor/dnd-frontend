import UserTableActions from 'store/actions/userTable';
import { UserTableAction } from 'types/actions';
import { UserTableState } from 'types/states';

const initialState = {
  users: [],
  page: 1,
  maxPages: 1,
  error: undefined,
  pending: false,
};

const userTableReducer = (
  state = initialState,
  action: UserTableAction,
): UserTableState => {
  switch (action.type) {
    case UserTableActions.INIT_TABLE:
      console.log('INIT_TABLE', { state, action });
      return {
        ...state,
        pending: true,
        error: undefined,
      };
    case UserTableActions.INIT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: undefined,
        users: action.payload.users,
        page: action.payload.page,
        maxPages: action.payload.maxPages,
      };
    case UserTableActions.INIT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case UserTableActions.NEXT_PAGE:
      return {
        ...state,
        page: action.payload.page,
        error: undefined,
      };
    case UserTableActions.PREV_PAGE:
      return {
        ...state,
        page: action.payload.page,
        error: undefined,
      };
    case UserTableActions.PAGINATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UserTableActions.DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
      };
    case UserTableActions.DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UserTableActions.UPDATE_USER:
      return {
        ...state,
        users: action.payload.users,
      };
    case UserTableActions.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      console.log('default', { state, action });
      return state;
  }
};

export default userTableReducer;
