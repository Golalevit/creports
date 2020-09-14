import { AuthState } from '@store/auth/types';
import { ReportState } from '@store/report/types';
import { RepositoriesState } from '@store/repositories/types';
import { UsersState } from '@store/users/types';

export interface RootReducer {
  auth: AuthState;
  report: ReportState;
  repositories: RepositoriesState;
  users: UsersState
}

export interface ErrorResponse {
  code: number;
  message: string;
}
