import { combineReducers } from '@reduxjs/toolkit';
import auth from 'store/reducers/auth';
import userTable from 'store/reducers/userTable';

const rootReducer = combineReducers({
  auth: auth,
  userTable: userTable,
});

export default rootReducer;
