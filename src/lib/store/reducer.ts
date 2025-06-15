import { combineReducers } from '@reduxjs/toolkit';

import authApi from '@redux/auth/auth.api';
import authReducer from '@redux/auth/auth.slice';

const rootReducers = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducers;
