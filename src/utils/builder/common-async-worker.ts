import { Action } from 'redux';
/**
 * Callback for adding two numbers.
 *
 * @callback defaultActionCb
 * @param {object} data option.
 * @param {string} data.url url
 * @param {string} data.method method
 */

/** Called after init
 * @param {defaultActionCb} fn
 */

export function commonWorker(fn: Function) {
  return (
    actionCreator: Action,
    url: string,
    method: string,
    {
      onSuccess,
      onFail,
    }: any = {},
  ) => (
    body: any = {},
    { cOnSuccess, cOnFail }: any = {},
  ) => async (dispatch: Function, getState: Function) => {
    const onSuccessHook = onSuccess || cOnSuccess;
    const onFailHook = onFail || cOnFail;

    return fn({
      actionCreator, url, method, body, dispatch, getState, onSuccessHook, onFailHook,
    });
  };
}
