export interface UsersState {
  users: UsersResponse[];
  usersLoading: boolean;
}

export interface UsersResponse {
  alias: string;
  users: string[];
  id: string;
}

export interface UsersFilter {
  label: string;
  value: number;
}
