import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RangeDatePicker } from '@components/ui-kit/range-datepicker';

import './filter-bar.scss';
import { getRepositoriesData } from '@store/repositories/repositories.selectors';
import { getRepositoriesWorker } from '@store/repositories/repositories.actions';
import { FilterBarProps } from './types';

export const FilterBar: FC<FilterBarProps> = ({ filters, setFilters }) => {
  const { repositories, repositoriesLoading } = useSelector(getRepositoriesData);

  return (
    <div className="filters">
      <div className="filters__projects">
        <Autocomplete
          value={filters.repositories}
          onChange={(_, newVal: any) => setFilters({
            repositories: newVal,
            startDate: filters.startDate,
            endDate: filters.endDate,
          })}
          options={repositories}
          label="Repositories"
          isLoading={repositoriesLoading}
          fetchOptions={getRepositoriesWorker}
        />
      </div>
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
    </div>
  );
};
