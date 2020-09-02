import { EmailConfig } from '@pages/report-page/types';
import { User } from '@store/report/types';

export interface EmailInterface extends EmailConfig {
  usersWorklogs: User[] | undefined;
  reportComment: string;
  reportDate: string;
}
