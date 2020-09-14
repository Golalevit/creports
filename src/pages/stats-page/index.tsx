import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RangeDatePicker } from '@components/ui-kit/range-datepicker';
import {
  getRepositoriesData,
  getUsersData,
  getUsers,
  getStats,
} from '@store/repositories/repositories.selectors';
import { FiltersConfig } from '@pages/stats-page/types';
import { Button } from '@components/ui-kit/button';
import {
  getStatsWorker,
  getRepositoriesWorker,
  getUsersWorker,
} from '@store/repositories/repositories.actions';
import './repository-page.scss';
import { RepositoriesResponse } from '@store/repositories/types';
import { Spinner } from '@components/spinner';
import { Stats } from './stats';

export const StatsPage: FC = () => {
  const dispatch = useDispatch();
  const { repositoriesLoading, repositories } = useSelector(getRepositoriesData);
  const { users, usersLoading } = useSelector(getUsersData);

  const userNames = useSelector(getUsers);
  const { stats, statsLoading } = useSelector(getStats);

  const getLocalStorage = (key: string, defaultValue: Array<string> | Date) => (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{}') : defaultValue);

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: new Date(getLocalStorage('startDate', new Date())),
    endDate: new Date(getLocalStorage('endDate', new Date())),
    projects: getLocalStorage('repositories', []),
    users: [],
  });

  useEffect(() => {
    if (filters.projects.length) {
      dispatch(
        getUsersWorker({
          repos: filters.projects.map((repo: RepositoriesResponse) => repo.label),
        }),
      );
    }
  }, [filters.projects]);

  const _setFilters = (data: FiltersConfig) => {
    localStorage.setItem('repositories', JSON.stringify(data.projects));
    localStorage.setItem('startDate', JSON.stringify(data.startDate));
    localStorage.setItem('endDate', JSON.stringify(data.endDate));

    setFilters(data);
  };

  useEffect(() => {
    setFilters({
      ...filters,
      users: filters.users?.filter((filteredUser) => users.some((user) => filteredUser.label === user.label)),
    });
  }, [users]);

  const generateStats = () => {
    dispatch(
      getStatsWorker({
        startDate: moment(filters.startDate).startOf('day').format('YYYY-MM-DD'),
        endDate: moment(filters.endDate).endOf('day').format('YYYY-MM-DD'),
        repos: filters.projects.map((p: { label: string; value: number }) => p.label),
        users: filters.users?.length ? filters.users.map((user) => user.label) : userNames,
      }),
    );
  };

  return (
    <div className="repositories__controls container">
      <div className="repositories__controls__filters">
        <div className="filters">
          <div className="filters__projects">
            <Autocomplete
              fetchOptions={getRepositoriesWorker}
              value={filters.projects}
              onChange={(_, newVal: RepositoriesResponse[]) => {
                _setFilters({
                  ...filters,
                  projects: newVal,
                });

                dispatch(
                  getUsersWorker({
                    repos: newVal.map((repo: RepositoriesResponse) => repo.label),
                  }),
                );
              }}
              options={repositories}
              label="Projects"
              isLoading={repositoriesLoading}
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
        <Button
          label="GENERATE"
          onClick={generateStats}
          disabled={repositoriesLoading || (!filters.projects.length && !filters.users?.length)}
        />
      </div>
      {users.length ? (
        <div className="filters">
          <div className="filters__projects">
            <Autocomplete
              fetchOptions={getRepositoriesWorker}
              value={filters.users!}
              onChange={(_, newVal: any) => setFilters({
                ...filters, users: newVal,
              })}
              options={users}
              label="Users"
              isLoading={usersLoading}
            />
          </div>
        </div>
      ) : null}
      {statsLoading ? <Spinner /> : <Stats stats={stats} />}
    </div>
  );
};
