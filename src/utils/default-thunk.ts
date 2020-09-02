import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store/types';
import { CustomError } from '@utils/custom-error';

export function createDefaultThunk<
  R,
  P = void,
  T = { dispatch: AppDispatch; state: RootState; rejectValue: CustomError }
>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<R, P, T>) {
  return createAsyncThunk<R, P, T>(typePrefix, payloadCreator);
}
