import actionCreatorFactory from 'typescript-fsa';
import { createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { RepositoriesResponse, StatsResponse } from '@store/repositories/types';

const actionCreator = actionCreatorFactory('REPOSITORY');

export const getRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_STATS',
);

export const getStats = actionCreator.async<object, StatsResponse[], ErrorResponse>(
  'GET_REPOSITORIES',
);

export const getUsers = actionCreator.async<object, string[], ErrorResponse>('GET_USERS');

export const getRepositoriesWorker = createDefaultFetchWorker(
  getRepositories,
  '/repository',
  'get',
);

export const getStatsWorker = createDefaultFetchWorker(getStats, '/repository/stats', 'post');

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/repository/users', 'post');
