import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducers';
import { reportReducer } from './report/report.reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
});

export type RootReduce = typeof rootReducer;
