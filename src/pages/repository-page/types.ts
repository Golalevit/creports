import { RepositoriesResponse } from '@store/repositories/types';

export interface FiltersConfig {
  startDate: Date | null;
  endDate: Date | null;
  repositories: RepositoriesResponse[];
}
