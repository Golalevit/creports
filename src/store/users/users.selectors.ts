import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getUsersState = (state: RootReducer) => state.users;

export const getUsersData = createSelector(
  getUsersState,
  ({ users, usersLoading }) => ({ users, usersLoading }),
);
