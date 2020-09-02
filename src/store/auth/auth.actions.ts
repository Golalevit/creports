import { createDefaultThunk } from '@utils/default-thunk';
import axiosInstance from '@utils/axios';

export const loginUser = createDefaultThunk<any, string>(
  'auth/login',
  async (code) => {
    await axiosInstance.post<boolean>('/auth', code);
  },
);

export const checkAuthenticated = createDefaultThunk(
  'auth/is-authenticated',
  async () => {
    await axiosInstance.get<boolean>('/auth/is-authenticated');
  },
);
