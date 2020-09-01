import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getRepositoriesState = (state: RootReducer) => state.repositories;

export const getRepositoriesData = createSelector(
  getRepositoriesState,
  ({ repositoriesLoading, repositories }) => ({ repositoriesLoading, repositories }),
);
