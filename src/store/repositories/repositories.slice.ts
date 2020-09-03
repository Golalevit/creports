import { RepositoriesState } from '@store/repositories/repositories.types';
import { createSlice } from '@reduxjs/toolkit';
import { getRepositories, getStats, getUsers } from '@store/repositories/repositories.actions';

const initialState: RepositoriesState = {
  repositories: [],
  repositoriesLoading: false,
  users: [],
  usersLoading: false,
  stats: [],
  statsLoading: false,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRepositories.pending, (state) => {
      state.repositoriesLoading = true;
    });
    builder.addCase(getRepositories.fulfilled, (state, res) => {
      state.repositoriesLoading = false;
      state.repositories = res.payload;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, res) => {
      state.usersLoading = false;
      state.users = res.payload;
    });

    builder.addCase(getStats.pending, (state) => {
      state.statsLoading = true;
    });
    builder.addCase(getStats.fulfilled, (state, res) => {
      state.statsLoading = false;
      state.stats = res.payload;
    });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;
