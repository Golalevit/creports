import { FiltersConfig } from '../types';

export interface FilterBarProps {
  filters: FiltersConfig;
  setFilters: (value: FiltersConfig) => void;
}
