export interface RepositoriesResponse {
  value: number;
  label: string;
}

export interface RepositoriesState {
  repositoryId: number | null;
  repositories: RepositoriesResponse[];
  repositoriesLoading: boolean;
  users: string[];
  usersLoading: boolean;
  stats: StatsResponse[];
  statsLoading: boolean;
}

export interface StatsResponse {
  name: string;
  commits: number;
  insertions: number;
  deletions: number;
  percent: number;
  byExt: Extension[];
  percentDeletions?: string;
  percentInsertions?: string;
}

export interface Extension {
  changed: number;
  percent: number;
  name: string;
}
