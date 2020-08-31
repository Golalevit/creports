import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRepositoriesData } from '@store/repositories/repositories.selectors';
import { FilterBar } from '@pages/repository-page/filter-bar';
import { FiltersConfig } from '@pages/repository-page/types';
import { Button } from '@components/ui-kit/button';
import './repository-page.scss';
import { Card } from '@material-ui/core';
import { getReportWorker } from '@store/report/report.actions';
import moment from 'moment';
import { getStatsWorker } from '@/store/repositories/repositories.actions';

export const RepositoryPage: FC = () => {
  const dispatch = useDispatch();

  const getLocalStorage = (key: string, defaultValue: Array<string> | Date) => (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{}') : defaultValue);

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: new Date(getLocalStorage('startDate', new Date())),
    endDate: new Date(getLocalStorage('endDate', new Date())),
    repositories: getLocalStorage('repositories', []),
  });

  const _setFilters = (data: FiltersConfig) => {
    localStorage.setItem('repositories', JSON.stringify(data.repositories));
    localStorage.setItem('startDate', JSON.stringify(data.startDate));
    localStorage.setItem('endDate', JSON.stringify(data.endDate));

    setFilters(data);
  };

  const generateStats = () => {
    dispatch(
      getStatsWorker({
        startDate: moment(filters.startDate).startOf('day').format('YYYY-MM-DD'),
        endDate: moment(filters.endDate).endOf('day').format('YYYY-MM-DD'),
        repos: filters.repositories.map((p: { label: string; value: number }) => p.value),
      }),
    );
  };

  return (
    <div className="repositories__controls">
      <div className="repositories__controls__filters">
        <FilterBar filters={filters} setFilters={_setFilters} />
        <Button
          label="GENERATE"
          onClick={generateStats}
          disabled={repositoriesLoading || !filters.repositories.length}
        />
      </div>
    </div>
  );
};

  const { repositoriesLoading } = useSelector(getRepositoriesData);