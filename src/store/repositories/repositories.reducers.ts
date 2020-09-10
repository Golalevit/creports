import {
  clearStateReducerActionCreator,
  defaultReducerActionCreator,
} from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import {
  getRepositories,
  getUsers,
  getStats, resetUsers, getAliasRepositories,
} from '@store/repositories/repositories.actions';
import { RepositoriesState } from './types';

const initialState: RepositoriesState = {
  repositories: [],
  repositoriesLoading: false,
  aliasRepositories: [],
  aliasRepositoriesLoading: false,
  users: [],
  usersLoading: false,
  stats: [],
  statsLoading: false,
  repositoryId: null,
};

export const repositoriesReducer = (state = initialState, action: Action): RepositoriesState => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(getRepositories, state, action, {
      dataMask: 'repositories',
      errorMask: 'repositoriesError',
      loadingMask: 'repositoriesLoading',
    }),
    ...defaultReducerActionCreator(getAliasRepositories, state, action, {
      dataMask: 'aliasRepositories',
      errorMask: 'repositoriesError',
      loadingMask: 'aliasRepositoriesLoading',
    }),
    ...defaultReducerActionCreator(getUsers, state, action, {
      dataMask: 'users',
      errorMask: 'repositoriesError',
      loadingMask: 'usersLoading',
    }),
    ...clearStateReducerActionCreator(resetUsers, state, action),
    ...defaultReducerActionCreator(getStats, state, action, {
      dataMask: 'stats',
      errorMask: 'repositoriesError',
      loadingMask: 'statsLoading',
    }),
  };
  return states[type] || state;
};
