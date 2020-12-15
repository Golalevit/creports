import actionCreatorFactory from 'typescript-fsa';
import { clearStateActionWorker, createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { RepositoriesResponse, StatsResponse, SshKeyResponse } from '@store/repositories/types';

const actionCreator = actionCreatorFactory('REPOSITORY');

export const getRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_REPOSITORIES',
);

export const getAliasRepositories = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_ALIAS_REPOSITORIES',
);

export const addAlias = actionCreator.async<object, null, ErrorResponse>(
  'ADD_ALIAS',
);

export const updateAlias = actionCreator.async<object, null, ErrorResponse>(
  'UPDATE_ALIAS',
);

export const deleteAlias = actionCreator.async<object, null, ErrorResponse>(
  'DELETE_ALIAS',
);

export const getStats = actionCreator.async<object, StatsResponse[], ErrorResponse>(
  'GET_STATS',
);

export const resetUsers = actionCreator(
  'RESET_USERS',
);

export const getRepositoryBySsh = actionCreator.async<object, RepositoriesResponse[], ErrorResponse>(
  'GET_REPOSITORY_BY_SSH',
);

export const getSshKey = actionCreator.async<object, SshKeyResponse, ErrorResponse>(
  'GET_SSH_KEY',
);

export const resetUsersWorker = clearStateActionWorker(resetUsers);

export const getUsers = actionCreator.async<object, string[], ErrorResponse>('GET_USERS');

export const addAliasWorker = createDefaultFetchWorker(addAlias, '/repository/aliases', 'post');

export const updateAliasWorker = (oldAlias: string) => createDefaultFetchWorker(addAlias, `/repository/aliases/alias=${oldAlias}`, 'put');

export const deleteAliasWorker = (alias: string) => createDefaultFetchWorker(deleteAlias, `/repository/aliases/alias=${alias}`, 'delete');

export const getRepositoriesWorker = createDefaultFetchWorker(
  getRepositories,
  '/repository',
  'get',
);

export const getAliasRepositoriesWorker = createDefaultFetchWorker(
  getAliasRepositories,
  '/repository?alias=true',
  'get',
);

export const getStatsWorker = createDefaultFetchWorker(getStats, '/repository/stats', 'post');

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/repository/users', 'post');

export const getRepositoryBySshWorker = createDefaultFetchWorker(getRepositoryBySsh, '/repository', 'post');

export const getSshKeyWorker = createDefaultFetchWorker(getSshKey, '/repository/sshkey', 'get');
