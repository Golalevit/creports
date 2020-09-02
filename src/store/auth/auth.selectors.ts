import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/types';

const authState = (state: RootState) => state.auth;

export const getIsAuthenticatedData = createSelector(
  authState,
  ({ isAuthenticated, authIsLoading }) => ({ isAuthenticated, authIsLoading }),
);
