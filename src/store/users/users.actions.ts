import actionCreatorFactory from 'typescript-fsa';
import { createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { UsersResponse } from '@store/users/types';

const actionCreator = actionCreatorFactory('USER');

export const getUsers = actionCreator.async<object, UsersResponse[], ErrorResponse>(
  'GET_USERS',
);

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/user-aliases', 'get');
