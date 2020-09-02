import { rootReducer } from './root.reducer';
import { store } from '.';

export interface ErrorResponse {
  code: number;
  message: string;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
