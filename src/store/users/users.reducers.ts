import {
  defaultReducerActionCreator,
} from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import { getUsers } from '@store/users/users.actions';
import { UsersState } from '@store/users/types';

const initialState: UsersState = {
  users: [],
  usersLoading: false,
};

export const usersReducer = (state = initialState, action: Action) => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(getUsers, state, action, {
      dataMask: 'users',
      errorMask: 'usersError',
      loadingMask: 'usersLoading',
    }),
  };
  return states[type] || state;
};
