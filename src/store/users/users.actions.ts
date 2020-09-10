import actionCreatorFactory from 'typescript-fsa';
import { createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ErrorResponse } from '@store/types';
import { UsersResponse } from '@store/users/types';

const actionCreator = actionCreatorFactory('USER');

export const getUsers = actionCreator.async<object, UsersResponse[], ErrorResponse>('GET_USERS');

export const deleteUsersAlias = actionCreator.async<object, null, ErrorResponse>('DELETE_ALIAS');

export const updateUserAlias = actionCreator.async<object, null, ErrorResponse>('UPDATE_ALIAS');

export const createUserAlias = actionCreator.async<object, boolean, ErrorResponse>('CREATE_ALIAS');

export const deleteUsersAliasWorker = (id: string) => createDefaultFetchWorker(deleteUsersAlias, `/user-aliases/${id}`, 'delete');

export const updateAliasWorker = (id: string) => createDefaultFetchWorker(updateUserAlias, `/user-aliases/${id}`, 'put');

export const getUsersWorker = createDefaultFetchWorker(getUsers, '/user-aliases', 'get');

export const createUserAliasWorker = createDefaultFetchWorker(
  createUserAlias,
  '/user-aliases',
  'post',
);
