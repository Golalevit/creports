import { AuthState } from '@store/auth/types';
import { ReportState } from '@store/report/types';

export interface RootReducer {
  auth: AuthState;
  report: ReportState;
}

export interface ErrorResponse {
  code: number;
  message: string;
}
