import { User, ReportResponse } from '@store/report/report.types';

export interface UserRowProps {
  user: User;
  userIndex: number;
  updateReport: (func: (data: ReportResponse) => void) => void;
}
