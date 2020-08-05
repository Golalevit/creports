import { ReportResponce } from '@store/report/types';

export interface ReportProps {
  report: ReportResponce | undefined;
  updateReport: any;
  comment: string;
  setComment: (data: string) => void;
}
