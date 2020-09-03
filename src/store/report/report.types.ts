export interface ProjectsResponse {
  value: number;
  label: string;
}

export interface ReportState {
  projects: ProjectsResponse[];
  projectsLoading: boolean;
  report: ReportResponse | undefined;
  reportLoading: boolean;
}

export interface Task {
  comment: string;
  name: string;
  taskId: string;
  timeSpent: string;
  updated: string;
  worklogId: string;
  showEditor?: boolean | undefined;
  excluded?: boolean;
  date: string;
}

export interface User {
  id: string;
  name: string;
  tasks: Task[];
  timeSpent: string;
  showEditor?: boolean | undefined;
}

export interface ReportResponse {
  total: string;
  users: User[];
}
