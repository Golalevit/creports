import { createDefaultThunk } from '@utils/default-thunk';
import axiosInstance from '@utils/axios';

export const loginUser = createDefaultThunk(
  'auth/login',
  async (code: string) => {
    await axiosInstance.post<boolean>('/auth', code);
  },
);

export const checkAuthenticated = createDefaultThunk(
  'auth/is-authenticated',
  async () => {
    await axiosInstance.get<boolean>('/auth/is-authenticated');
  },
);
