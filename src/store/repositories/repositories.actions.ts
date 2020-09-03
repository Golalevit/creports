import { RepositoriesResponse, StatsResponse } from '@store/repositories/repositories.types';
import { createDefaultThunk } from '@utils/default-thunk';
import axiosInstance from '@utils/axios';
import { StatsInterface } from '@models/interfaces/stats';

export const getRepositories = createDefaultThunk<RepositoriesResponse[]>(
  'repositories/get-repositories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/repository');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getProjectUsers = createDefaultThunk<{ id: number; users: string[] }, { url: string }>(
  'repositories/get-project-users',
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{ id: number; users: string[] }>(
        '/repository/project-users',
        url,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUsers = createDefaultThunk<string[], { repos: number[] }>(
  'repositories/get-users',
  async (repos, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<string[]>('/repository/users', repos);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getStats = createDefaultThunk<StatsResponse[], StatsInterface>(
  'repositories/get-stats',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<StatsResponse[]>('/repository/stats', payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
