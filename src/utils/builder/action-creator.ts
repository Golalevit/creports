import { Action, Type } from './types';

/**
 * Factory for creating action types
 * @param {string} preffix action preffix
 */
export const actionCreatorFactory = (preffix: string) => {
  const base: string = preffix ? `${preffix}` : '';

  /**
   *
   * @param {string} type action name
   */
  const createAction = (type: string) => {
    const actionTypes: { [key: string]: any } = {};
    const fullType = `${base}_${type}`;

    if (actionTypes[fullType]) {
      throw new Error(`${fullType} action already exists!`);
    }

    actionTypes[fullType] = true;

    return Object.assign(
      (payload: string) => ({ type: fullType, payload }),
      {
        type: fullType,
      },
    );
  };

  /**
   *
   * @param {string} type action name
   */
  const createAsyncAction = (type: string) => ({
    type: `${base}_${type}`,
    start: createAction(`${type}_START`),
    done: createAction(`${type}_DONE`),
    fail: createAction(`${type}_FAIL`),
  });

  return Object.assign(createAction, { async: createAsyncAction });
};

export const isType = (action: Action, actionCreator: Type) => action.type === actionCreator.type;
