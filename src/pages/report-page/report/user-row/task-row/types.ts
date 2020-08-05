import { Task } from '@store/report/types';

export interface TaskRowProps {
  task: Task;
  userIndex: number;
  taskIndex: number;
  updateReport: any;
}
