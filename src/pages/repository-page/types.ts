import { RepositoriesResponse } from '@store/repositories/repositories.types';

export interface FiltersConfig {
  startDate: Date | null;
  endDate: Date | null;
  list: RepositoriesResponse[];
}
