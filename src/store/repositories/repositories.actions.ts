import actionCreatorFactory from 'typescript-fsa';
import { clearStateActionWorker, createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { RepositoriesResponse, StatsResponse } from '@store/repositories/types';

const actionCreator = actionCreatorFactory('REPOSITORY');

export const getRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_REPOSITORIES',
);

export const getStats = actionCreator.async<object, StatsResponse[], ErrorResponse>(
  'GET_STATS',
);

export const getProjectUsers = actionCreator.async<object, {id: number; users: string[]}, ErrorResponse>(
  'GET_PROJECT_USERS',
);

export const resetUsers = actionCreator(
  'RESET_USERS',
);

export const resetUsersWorker = clearStateActionWorker(
  resetUsers,
);

export const getUsers = actionCreator.async<object, string[], ErrorResponse>('GET_USERS');

export const getRepositoriesWorker = createDefaultFetchWorker(
  getRepositories,
  '/repository',
  'get',
);

export const getProjectUsersWorker = createDefaultFetchWorker(getProjectUsers, '/repository/project-users', 'post');

export const getStatsWorker = createDefaultFetchWorker(getStats, '/repository/stats', 'post');

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/repository/users', 'post');
