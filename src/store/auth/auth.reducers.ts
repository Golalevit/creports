import { defaultReducerActionCreator } from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import { AuthState } from './types';
import {
  isAuthenticated, login,
} from './auth.actions';

const initialState: AuthState = {
  isAuthenticated: false,
  authIsLoading: true,
};

export const authReducer = (state = initialState, action: Action): AuthState => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(isAuthenticated, state, action, { dataMask: 'isAuthenticated', errorMask: 'authError', loadingMask: 'authIsLoading' }),
    ...defaultReducerActionCreator(login, state, action, { dataMask: 'isAuthenticated' }),
  };
  return states[type] || state;
};
