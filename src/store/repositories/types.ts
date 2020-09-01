export interface RepositoriesResponse {
  value: number;
  label: string;
}

export interface RepositoriesState {
  repositories: RepositoriesResponse[];
  repositoriesLoading: boolean;
}

export interface StatsResponse {
  name: string;
  commits: number;
  insertions: number;
  deletions: number;
  percent: number;
  graphPercent: number;
  graphLine: string;
}
