import { combineReducers } from '@reduxjs/toolkit';
import auth from 'common/store/reducers/auth';
import user from 'common/store/reducers/users';

const rootReducer = combineReducers({
  auth: auth,
  user: user,
});

export default rootReducer;
