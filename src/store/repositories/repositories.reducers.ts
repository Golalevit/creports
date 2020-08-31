import { defaultReducerActionCreator } from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import { getRepositories } from '@store/repositories/repositories.actions';
import { RepositoriesState } from './types';

const initialState: RepositoriesState = {
  repositories: [],
  repositoriesLoading: false,
};

export const repositoriesReducer = (state = initialState, action: Action): RepositoriesState => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(getRepositories, state, action, { dataMask: 'repositories', errorMask: 'repositoriesError', loadingMask: 'repositoriesLoading' }),
  };
  return states[type] || state;
};
