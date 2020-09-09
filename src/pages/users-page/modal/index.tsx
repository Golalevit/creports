import React, { FC, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { FilterBar } from '@pages/repository-page/filter-bar';
import { FiltersConfig } from '@pages/repository-page/types';
import {
  getRepositoriesWorker,
  getUsersWorker,
  resetUsersWorker,
} from '@store/repositories/repositories.actions';
import { RepositoriesResponse } from '@store/repositories/types';
import { useDispatch, useSelector } from 'react-redux';
import { getRepositoriesData, getUsersData } from '@store/repositories/repositories.selectors';
import './modal.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';
import { createUserAliasWorker, getUsersWorker as getUserAliasWorker } from '@store/users/users.actions';
import { AddAliasModalProps } from '@pages/users-page/modal/types';

export const AddAliasModal: FC<AddAliasModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector(getUsersData);
  const { repositories, repositoriesLoading } = useSelector(getRepositoriesData);

  const useStylesModal = makeStyles({
    paper: {
      padding: 25,
      height: 250,
    },
  });

  const classesModal = useStylesModal();

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: null,
    endDate: null,
    list: [],
  });

  const [userFilters, setUserFilters] = useState<FiltersConfig>({
    startDate: null,
    endDate: null,
    list: [],
  });

  const resetStates = () => {
    setUserFilters({
      startDate: null,
      endDate: null,
      list: [],
    });
    setFilters({
      startDate: null,
      endDate: null,
      list: [],
    });
  };

  const [alias, setAlias] = useState<string>('');

  useEffect(() => {
    if (filters.list.length) {
      dispatch(
        getUsersWorker({
          repos: filters.list.map((repo: RepositoriesResponse) => repo.value),
        }),
      );
    }
  }, []);

  const _setFilters = (data: FiltersConfig) => {
    setFilters(data);
  };

  const onChange = (_, newVal: any) => {
    _setFilters({
      list: newVal,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

    dispatch(
      getUsersWorker({
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

  return (
    <Dialog
      classes={classesModal}
      fullWidth
      onClose={onClose}
      open={open}
    >
      <div>
        <FilterBar
          fetchOptions={getRepositoriesWorker}
          onChange={onChange}
          showDatePicker={false}
          label="Projects"
          isLoading={repositoriesLoading}
          options={repositories}
          filters={filters}
          setFilters={setFilters}
        />
        {users.length ? (
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
        {userFilters.list.length ? (
          <Input label="Alias" value={alias!} onChange={(e) => setAlias(e.target.value)} />
        ) : null}
      </div>
      <div className="button">
        <Button
          disabled={!alias.length}
          onClick={async () => {
            await dispatch(
              createUserAliasWorker({ alias, users: userFilters.list.map((user) => user.label) },
                {
                  cOnSuccess: () => {
                    onClose();
                    resetStates();
                    dispatch(resetUsersWorker('users', []));
                  },
                }),
            );
            dispatch(getUserAliasWorker());
          }}
          label="CREATE ALIAS"
        />
      </div>
    </Dialog>
  );
};
