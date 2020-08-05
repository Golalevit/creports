import { isType } from './action-creator';
import { Action, DataMasks, AsyncAction } from './types';
/**
 * @param {string} name
 * @param {object} state prevState
 * @param {object} action
*/
const clearStateReducer = (name: string, state: any, action: Action) => ({
  [name]: {
    ...state,
    ...action.payload,
  },
});

/**
 * @param {object} actionCreator
 * @param {object} state prevState
 * @param {object} action
*/
const clearStateReducerActionCreator = (actionCreator: any, state: any, action: Action) => ({
  [actionCreator.type]: {
    ...state,
    ...action.payload,
  },
});

/**
 * @param {object} actionCreator
 * @param {object} state prevState
 * @param {object} action
 * @param {object} masks custom object names
*/
const defaultReducerActionCreator = (
  actionCreator: AsyncAction,
  state: any,
  action: Action,
  masks?: DataMasks,
) => {
  const { loadingMask = 'isLoading', errorMask = 'errors', dataMask } = masks || {};
  return {
    [actionCreator.started.type]: {
      ...state,
      [loadingMask]: true,
      [errorMask]: false,
    },
    [actionCreator.done.type]: {
      ...state,
      ...(dataMask ? { [dataMask]: action.payload } : { ...action.payload }),
      [loadingMask]: false,
      [errorMask]: false,
    },
    [actionCreator.failed.type]: {
      ...state,
      [errorMask]: action.payload,
      [loadingMask]: false,
    },
  };
};

/**
 * @param {object} actionCreator
*/
const createDictionaryReducer = (actionCreator: AsyncAction) => (state = {
  data: [],
  total: 0,
  isLoading: false,
  errors: false,
}, action: Action) => {
  if (isType(action, actionCreator.started)) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (isType(action, actionCreator.done)) {
    return {
      data: action.payload.data,
      total: action.payload.total || 0,
      isLoading: false,
    };
  }
  if (isType(action, actionCreator.failed)) {
    return {
      ...state,
      errors: true,
      isLoading: false,
    };
  }
  return state;
};

export {
  clearStateReducer,
  defaultReducerActionCreator,
  clearStateReducerActionCreator,
  createDictionaryReducer,
};
