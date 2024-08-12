import { combineReducers } from '@reduxjs/toolkit';
import auth from 'store/reducers/auth';
import user from 'store/reducers/users';

const rootReducer = combineReducers({
  auth: auth,
  user: user,
});

export default rootReducer;
