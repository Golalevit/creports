import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getProjectsWorker } from '@store/report/report.actions';
import { getProjectsData } from '@store/report/report.selectors';

import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RangeDatePicker } from '@components/ui-kit/range-datepicker';

import { FilterBarProps } from './types';

import './filter-bar.scss';

export const FilterBar: FC<FilterBarProps> = ({
  filters, setFilters,
}) => {
  const { projectsLoading, projects } = useSelector(getProjectsData);

  return (
    <div className="filters">
      <div className="filters__projects">
        <Autocomplete
          value={filters.projects}
          onChange={(_, newVal: any) => setFilters({
            projects: newVal,
            startDate: filters.startDate,
            endDate: filters.endDate,
          })}
          options={projects}
          label="Projects"
          isLoading={projectsLoading}
          fetchOptions={getProjectsWorker}
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
