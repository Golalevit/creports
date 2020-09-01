import React, { FC } from 'react';

import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RangeDatePicker } from '@components/ui-kit/range-datepicker';

import { FilterBarProps } from './types';
import './filter-bar.scss';

export const FilterBar: FC<FilterBarProps> = ({
  filters,
  setFilters,
  showDatePicker,
  label,
  options,
  isLoading,
  onChange,
  fetchOptions,
}) => (
  <div className="filters">
    <div className="filters__projects">
      <Autocomplete
        fetchOptions={fetchOptions}
        value={filters.list}
        onChange={onChange}
        options={options}
        label={label}
        isLoading={isLoading}
      />
    </div>
    {showDatePicker && (
    <div className="filters__controlls">
      <RangeDatePicker
        startDate={filters.startDate}
        endDate={filters.endDate}
        onChange={(range) => setFilters({
          ...filters,
          ...range,
        })}
      />
    </div>
    )}
  </div>
);
