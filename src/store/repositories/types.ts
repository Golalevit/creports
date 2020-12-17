export interface RepositoriesResponse {
  value: number;
  label: string;
}

export interface SshKeyResponse {
  publicKey: string;
}

export interface AliasRepositoriesResponse extends RepositoriesResponse {
  alias: string;
  projects: string[];
}

export interface RepositoriesErrorResponse {
  code: number,
  message: string,
}

export interface RepositoriesState {
  repositoryId: number | null;
  repositories: RepositoriesResponse[];
  repositoriesLoading: boolean;
  aliasRepositories: AliasRepositoriesResponse[];
  aliasRepositoriesLoading: boolean;
  users: string[];
  usersLoading: boolean;
  stats: StatsResponse[];
  statsLoading: boolean;
  sshKey: SshKeyResponse;
  repositoriesError: RepositoriesErrorResponse | null;
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
