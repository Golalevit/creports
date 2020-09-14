import { combineReducers } from 'redux';
import { repositoriesReducer } from '@store/repositories/repositories.reducers';
import { authReducer } from './auth/auth.reducers';
import { reportReducer } from './report/report.reducers';
import { usersReducer } from '@store/users/users.reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
  repositories: repositoriesReducer,
  users: usersReducer,
});

export type RootReduce = typeof rootReducer;
