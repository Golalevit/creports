import actionCreatorFactory from 'typescript-fsa';
import { clearStateActionWorker, createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { RepositoriesResponse, StatsResponse } from '@store/repositories/types';

const actionCreator = actionCreatorFactory('REPOSITORY');

export const getRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_REPOSITORIES',
);

export const getAliasRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_ALIAS_REPOSITORIES',
);

export const getStats = actionCreator.async<object, StatsResponse[], ErrorResponse>(
  'GET_STATS',
);

export const resetUsers = actionCreator(
  'RESET_USERS',
);

export const resetUsersWorker = clearStateActionWorker(resetUsers);

export const getUsers = actionCreator.async<object, string[], ErrorResponse>('GET_USERS');

export const getRepositoriesWorker = createDefaultFetchWorker(
  getRepositories,
  '/repository',
  'get',
);

export const getAliasRepositoriesWorker = createDefaultFetchWorker(
  getRepositories,
  '/repository?alias=true',
  'get',
);

export const getStatsWorker = createDefaultFetchWorker(getStats, '/repository/stats', 'post');

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/repository/users', 'post');
