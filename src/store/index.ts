import { configureStore, createAction } from '@reduxjs/toolkit';
import { rootReducer } from '@store/root.reducer';

export const resetStore = createAction('resetStore');

export const store = configureStore({
  reducer: rootReducer,
});
