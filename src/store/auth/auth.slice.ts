import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@store/auth/auth.types';
import { checkAuthenticated, loginUser } from '@store/auth/auth.actions';

const initialState: AuthState = {
  authIsLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth(state) {
      state.authIsLoading = initialState.authIsLoading;
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.authIsLoading = false;
      state.isAuthenticated = true;
    });

    builder.addCase(checkAuthenticated.pending, (state) => {
      state.authIsLoading = true;
    });
    builder.addCase(checkAuthenticated.fulfilled, (state) => {
      state.authIsLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuthenticated.rejected, (state) => {
      state.authIsLoading = false;
      state.isAuthenticated = false;
    });
  },
});

export const authReducer = authSlice.reducer;
