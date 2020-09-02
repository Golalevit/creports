import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, ErrorResponse, RootState } from '@store/types';

export function createDefaultThunk<
  R,
  P = void,
  T = { dispatch: AppDispatch; state: RootState; rejectValue: ErrorResponse }
>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<R, P, T>) {
  return createAsyncThunk<R, P, T>(typePrefix, payloadCreator);
}
