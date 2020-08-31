import { AuthState } from '@store/auth/types';
import { ReportState } from '@store/report/types';
import { RepositoriesState } from '@store/repositories/types';

export interface RootReducer {
  auth: AuthState;
  report: ReportState;
  repositories: RepositoriesState;
}

export interface ErrorResponse {
  code: number;
  message: string;
}
