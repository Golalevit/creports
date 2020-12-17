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

export const getAliasRepositories = createSelector(getRepositoriesState, ({ aliasRepositories, aliasRepositoriesLoading }) => ({ aliasRepositories, aliasRepositoriesLoading }));

export const getUsers = createSelector(getRepositoriesState, (state) => state.users);

export const getStats = createSelector(getRepositoriesState, ({ stats, statsLoading }) => ({
  stats,
  statsLoading,
}));

export const getSshKey = createSelector(getRepositoriesState, (state) => state.sshKey);

export const getAliasesData = createSelector(
  getRepositoriesState,
  ({ aliasesLoading, aliases }) => ({ aliasesLoading, aliases }),
);
