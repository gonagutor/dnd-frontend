import UserActions from 'common/store/actions/users';
import { UserAction } from 'common/types/actions';
import { UserState } from 'common/types/states';

const initialState = {
  users: [],
  page: 1,
  maxPages: 1,
  key: 'created_at',
  sortOrder: 'DESC',
  error: undefined,
  pending: false,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActions.INIT_TABLE:
      return {
        ...state,
        pending: true,
        error: undefined,
      };
    case UserActions.INIT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: undefined,
        users: action.payload.users,
        page: action.payload.page,
        maxPages: action.payload.maxPages,
        key: action.payload.key,
        sortOrder: action.payload.sortOrder,
      };
    case UserActions.INIT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case UserActions.NEXT_PAGE:
    case UserActions.PREV_PAGE:
    case UserActions.SELECT_PAGE:
      return {
        ...state,
        page: action.payload.page,
        error: undefined,
      };
    case UserActions.DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
      };
    case UserActions.PAGINATION_FAILURE:
    case UserActions.DELETE_USER_FAILURE:
    case UserActions.UPDATE_USER:
    case UserActions.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      console.log('default', { state, action });
      return state;
  }
};

export default userReducer;
