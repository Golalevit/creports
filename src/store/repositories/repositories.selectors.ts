import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getRepositoriesState = (state: RootReducer) => state.repositories;

export const getRepositoriesData = createSelector(
  getRepositoriesState,
  ({ repositoriesLoading, repositories }) => ({ repositoriesLoading, repositories }),
);

export const getUsersData = createSelector(getRepositoriesState, ({ users, usersLoading }) => ({
  users: users.map((user, index) => ({ value: index, label: user })),
  usersLoading,
}));

export const getUsers = createSelector(getRepositoriesState, (state) => state.users);

export const getStats = createSelector(getRepositoriesState, ({ stats, statsLoading }) => ({
  stats,
  statsLoading,
}));

export const getRepoId = createSelector(getRepositoriesState, (state) => state.repositoryId);
