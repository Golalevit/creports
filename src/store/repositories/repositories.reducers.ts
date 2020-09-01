import { defaultReducerActionCreator } from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import { getRepositories, getUsers } from '@store/repositories/repositories.actions';
import { RepositoriesState } from './types';

const initialState: RepositoriesState = {
  repositories: [],
  repositoriesLoading: false,
  users: [],
  usersLoading: false,
};

export const repositoriesReducer = (state = initialState, action: Action): RepositoriesState => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(getRepositories, state, action, {
      dataMask: 'repositories',
      errorMask: 'repositoriesError',
      loadingMask: 'repositoriesLoading',
    }),
    ...defaultReducerActionCreator(getUsers, state, action, {
      dataMask: 'users',
      errorMask: 'repositoriesError',
      loadingMask: 'usersLoading',
    }),
  };
  return states[type] || state;
};
