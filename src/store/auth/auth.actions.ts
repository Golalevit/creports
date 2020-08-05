import actionCreatorFactory from 'typescript-fsa';
import { createDefaultFetchWorker } from '@utils/builder/default-actions';
import { UserAuthenticatedResponse } from './types';
import { ErrorResponse } from '../types';

const actionCreator = actionCreatorFactory('user');
export const login = actionCreator.async<object, any, ErrorResponse>('LOGIN');
export const isAuthenticated = actionCreator.async<object, UserAuthenticatedResponse, ErrorResponse>('USER_AUTHENTICATED');

export const userAuthenticatedWorker = createDefaultFetchWorker(isAuthenticated, '/auth/is-authenticated', 'get');
export const loginWorker = createDefaultFetchWorker(login, '/auth', 'post');
