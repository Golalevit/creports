import { ReportResponse } from '@store/report/types';

export interface ReportProps {
  report: ReportResponse | undefined;
  updateReport: any;
  comment: string;
  setComment: (data: string) => void;
}
