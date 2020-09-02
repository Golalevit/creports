import { combineReducers } from 'redux';
import { repositoriesReducer } from '@store/repositories/repositories.reducers';
import { authReducer } from '@store/auth/auth.slice';
import { reportReducer } from './report/report.reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
  repositories: repositoriesReducer,
});
