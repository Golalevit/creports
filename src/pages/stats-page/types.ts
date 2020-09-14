import { RepositoriesResponse } from '@store/repositories/types';
import { UsersFilter } from '@store/users/types';

export interface FiltersConfig {
  startDate: Date | null;
  endDate: Date | null;
  projects: RepositoriesResponse[];
  users?: UsersFilter[];
}
