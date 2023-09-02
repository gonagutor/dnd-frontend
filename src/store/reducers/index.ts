import { combineReducers } from '@reduxjs/toolkit';
import auth from 'store/reducers/auth';

const rootReducer = combineReducers({
  auth: auth,
});

export default rootReducer;
