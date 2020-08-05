import { User, ReportResponce } from '@store/report/types';

export interface UserRowProps {
  user: User;
  userIndex: number;
  updateReport: (func: (data: ReportResponce) => void) => void;
}
