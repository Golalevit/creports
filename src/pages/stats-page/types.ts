import { RepositoriesResponse } from '@store/repositories/types';
import { UsersResponse } from '@store/users/types';

export interface FiltersConfig {
  startDate: Date | null;
  endDate: Date | null;
  projects: RepositoriesResponse[];
  users: UsersResponse[];
}
