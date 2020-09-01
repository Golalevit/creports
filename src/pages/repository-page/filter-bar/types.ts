import { FiltersConfig } from '../types';

export interface FilterBarProps {
  filters: FiltersConfig;
  setFilters: (value: FiltersConfig) => void;
  showDatePicker: boolean;
  label: string;
  options: any[];
  isLoading: boolean;
  fetchOptions?: () => void;
  onChange: (_: any, newVal: any) => void;
}
