import { RepositoriesState } from '@store/repositories/repositories.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getRepositories,
  getStats,
  getUsers,
  getProjectUsers,
} from '@store/repositories/repositories.actions';

const initialState: RepositoriesState = {
  repositoryId: null,
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
  reducers: {
    resetUsers(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRepositories.pending, (state) => {
      state.repositoriesLoading = true;
    });
    builder.addCase(getRepositories.fulfilled, (state, res) => {
      state.repositoriesLoading = false;
      state.repositories = res.payload;
    });

    builder.addCase(getProjectUsers.fulfilled, (state, res) => {
      state.users = res.payload.users;
      state.repositoryId = res.payload.id;
    });
    builder.addCase(getProjectUsers.rejected, (state) => {
      state.users = [];
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
export const { resetUsers } = repositoriesSlice.actions;
