import axiosInstance from '@utils/axios';
import { commonWorker } from './common-async-worker';
import { AsyncAction, Axios } from './types';

const _axios: Axios = axiosInstance;

const createDefaultFormDataWorker = commonWorker(
  async ({
    dispatch,
    actionCreator,
    method,
    url,
    body,
    onSuccessHook,
    onFailHook,
  }: {
    dispatch: Function;
    actionCreator: AsyncAction;
    method: string;
    url: string;
    body: any;
    onSuccessHook: Function;
    onFailHook: Function;
  }) => {
    dispatch(actionCreator.started());
    try {
      const formData = new FormData();

      Object.keys(body).forEach((key) => {
        const isArray = Array.isArray(body[key]);
        if (isArray) {
          body[key].forEach((i: any) => formData.append(`${key}[]`, i));
        }
        return typeof body[key] !== 'undefined' && !isArray && formData.append(key, body[key]);
      });
      await _axios[method](`${process.env.API_URL}${url}`, formData);

      if (onSuccessHook) {
        await onSuccessHook({ dispatch });
      }

      dispatch(actionCreator.done());
    } catch (error) {
      dispatch(actionCreator.failed());

      if (onFailHook) {
        await onFailHook({ dispatch });
      }
    }
  },
);

const createDefaultActionWorker = commonWorker(async ({
  dispatch,
  actionCreator,
  method,
  url,
  body,
  onSuccessHook,
  onFailHook,
}: {
  dispatch: Function;
  actionCreator: AsyncAction;
  method: string;
  url: string;
  body: any;
  onSuccessHook: Function;
  onFailHook: Function;
}) => {
  dispatch(actionCreator.started());
  try {
    await _axios[method](`${process.env.API_URL}${url}`, body);

    if (onSuccessHook) {
      await onSuccessHook({ dispatch });
    }

    dispatch(actionCreator.done());
  } catch (error) {
    dispatch(actionCreator.failed());

    if (onFailHook) {
      await onFailHook({ dispatch });
    }
  }
});

const clearStateActionWorker = (actionCreator: any) => (
  fieldName: string, value: any,
) => (dispatch: Function) => dispatch(actionCreator({ [fieldName]: value }));

const createDefaultDictionaryWorker = (
  actionCreator: AsyncAction, url: string, search: string,
) => (body = {}) => async (dispatch: Function) => {
  dispatch(actionCreator.started());
  try {
    const res = await _axios.get(`${process.env.API_URL}${url}${search}`, {
      params: { ...body },
    });
    dispatch(actionCreator.done({ ...res.data }));
  } catch (error) {
    dispatch(actionCreator.failed());
  }
};

const createDefaultFetchWorker = commonWorker(async ({
  dispatch,
  actionCreator,
  method,
  url,
  body,
  onSuccessHook,
  onFailHook,
}: {
  dispatch: Function;
  actionCreator: AsyncAction;
  method: string;
  url: string;
  body: any;
  onSuccessHook: Function;
  onFailHook: Function;
}) => {
  dispatch(actionCreator.started());
  try {
    const res = await _axios[method](`${process.env.API_URL}${url}`, body);
    dispatch(actionCreator.done(res.data));

    if (onSuccessHook) {
      await onSuccessHook({ dispatch, data: res.data });
    }
  } catch (error) {
    dispatch(actionCreator.failed(error.response?.data));

    if (onFailHook) {
      await onFailHook({ dispatch });
    }
  }
});

export {
  createDefaultFetchWorker,
  createDefaultFormDataWorker,
  createDefaultActionWorker,
  clearStateActionWorker,
  createDefaultDictionaryWorker,
};
