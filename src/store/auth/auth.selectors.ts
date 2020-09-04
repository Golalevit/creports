import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getAuthState = (state: RootReducer) => state.auth;

export const getIsAuthenticatedData = createSelector(
  getAuthState,
  ({ isAuthenticated, authIsLoading }) => ({ isAuthenticated, authIsLoading }),
);
