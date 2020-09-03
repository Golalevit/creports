import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRepositoriesData,
  getUsersData,
  getUsers,
  getStats,
  getRepoId,
} from '@store/repositories/repositories.selectors';
import { FilterBar } from '@pages/repository-page/filter-bar';
import { FiltersConfig } from '@pages/repository-page/types';
import { Button } from '@components/ui-kit/button';
import moment from 'moment';
import {
  getStats as getStatsAction,
  getRepositories as getRepositoriesAction,
  getUsers as getUsersAction,
} from '@store/repositories/repositories.actions';
import './repository-page.scss';
import { RepositoriesResponse } from '@store/repositories/repositories.types';
import { Spinner } from '@components/spinner';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { resetUsers } from '@store/repositories/repositories.slice';
import { Stats } from './stats';

export const RepositoryPage: FC = () => {
  const dispatch = useDispatch();
  const { repositoriesLoading, repositories } = useSelector(getRepositoriesData);
  const { users, usersLoading } = useSelector(getUsersData);
  const repoId = useSelector(getRepoId);

  const userNames = useSelector(getUsers);
  const { stats, statsLoading } = useSelector(getStats);

  const getLocalStorage = (key: string, defaultValue: Array<string> | Date) => (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{}') : defaultValue);

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: new Date(getLocalStorage('startDate', new Date())),
    endDate: new Date(getLocalStorage('endDate', new Date())),
    list: getLocalStorage('repositories', []),
  });

  const [checked, setChecked] = useState<boolean>(false);

  const [userFilters, setUserFilters] = useState<FiltersConfig>({
    startDate: new Date(getLocalStorage('startDate', new Date())),
    endDate: new Date(getLocalStorage('endDate', new Date())),
    list: [],
  });

  useEffect(() => {
    if (filters.list.length) {
      dispatch(
        getUsersAction({
          repos: filters.list.map((repo: RepositoriesResponse) => repo.value),
        }),
      );
    }
  }, []);

  const _setFilters = (data: FiltersConfig) => {
    localStorage.setItem('repositories', JSON.stringify(data.list));
    localStorage.setItem('startDate', JSON.stringify(data.startDate));
    localStorage.setItem('endDate', JSON.stringify(data.endDate));

    setFilters(data);
  };

  const onChange = (_, newVal: any) => {
    _setFilters({
      list: newVal,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

    dispatch(
      getUsersAction({
        repos: newVal.map((repo: RepositoriesResponse) => repo.value),
      }),
    );
  };

  useEffect(() => {
    setUserFilters({
      ...userFilters,
      list: userFilters.list.filter((filteredUser) => users.some((user) => filteredUser.label === user.label)),
    });
  }, [users]);

  const onUserChange = (_, newVal: any) => {
    setUserFilters({
      list: newVal,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  };

  const generateStats = () => {
    dispatch(
      getStatsAction({
        startDate: moment(filters.startDate).startOf('day').format('YYYY-MM-DD'),
        endDate: moment(filters.endDate).endOf('day').format('YYYY-MM-DD'),
        repos: checked
          ? [repoId!]
          : filters.list.map((p: { label: string; value: number }) => p.value),
        users: userFilters.list.length ? userFilters.list.map((user) => user.label) : userNames,
      }),
    );
  };

  return (
    <div className="repositories__controls">
      <div className="repositories__controls__filters">
        <FilterBar
          showDatePicker
          onChange={onChange}
          label="Repositories"
          fetchOptions={getRepositoriesAction}
          isLoading={repositoriesLoading}
          options={repositories}
          filters={filters}
          setFilters={_setFilters}
          checked={checked}
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={checked}
              onChange={() => {
                if (!checked) {
                  dispatch(resetUsers());
                }
                if (checked) {
                  dispatch(
                    getUsersAction({
                      repos: filters.list.map((repo: RepositoriesResponse) => repo.value),
                    }),
                  );
                }
                setChecked(!checked);
              }}
              name="checkedB"
              color="primary"
            />
          )}
          label="Gitlab Project URL"
        />
        <Button
          label="GENERATE"
          onClick={generateStats}
          disabled={repositoriesLoading || (!filters.list.length && !users.length)}
        />
      </div>
      {filters.list.length || users.length ? (
        <FilterBar
          onChange={onUserChange}
          showDatePicker={false}
          label="Users"
          isLoading={usersLoading}
          options={users}
          filters={userFilters}
          setFilters={setUserFilters}
        />
      ) : null}
      {statsLoading ? <Spinner /> : <Stats stats={stats} />}
    </div>
  );
};
