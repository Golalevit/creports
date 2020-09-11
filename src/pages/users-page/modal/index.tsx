import React, { FC, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { FilterBar } from '@pages/stats-page/filter-bar';
import { FiltersConfig } from '@pages/stats-page/types';
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
import {
  createUserAliasWorker,
  getUsersWorker as getUserAliasWorker,
  updateAliasWorker,
} from '@store/users/users.actions';
import { AddAliasModalProps } from '@pages/users-page/modal/types';
import { getAliasUsers } from '@store/users/users.selectors';

export const AddAliasModal: FC<AddAliasModalProps> = ({
  open,
  handleModal,
  aliasId,
  resetAliasId,
}) => {
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector(getUsersData);
  const aliasResult = useSelector(getAliasUsers(aliasId));
  const aliasOptions = aliasResult?.users.map((user, index) => ({ label: user, value: index }));
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

  const [alias, setAlias] = useState<string>('');

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
        repos: newVal.map((repo: RepositoriesResponse) => repo.label),
      }),
    );
  };

  useEffect(() => {
    if (!aliasOptions) {
      setUserFilters({
        ...userFilters,
        list: userFilters.list.filter((filteredUser) =>
          users.some((user) => filteredUser.label === user.label),
        ),
      });
    }
  }, [users]);

  useEffect(() => {
    if (aliasOptions) {
      setAlias(aliasResult!.alias);
      setUserFilters({
        ...userFilters,
        list: aliasOptions,
      });
    }
  }, [aliasId]);

  const onUserChange = (_, newVal: any) => {
    setUserFilters({
      list: newVal,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  };

  return (
    <Dialog
      onClose={() => {
        setAlias('');
        resetStates();
        dispatch(resetUsersWorker('users', []));
        resetAliasId();
        handleModal(false);
      }}
      classes={classesModal}
      fullWidth
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
        {users.length || aliasResult?.users.length ? (
          <FilterBar
            onChange={onUserChange}
            showDatePicker={false}
            label="Users"
            isLoading={usersLoading}
            options={users || aliasOptions}
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
          onClick={() => {
            if (aliasId) {
              dispatch(
                updateAliasWorker(aliasId)(
                  {
                    alias,
                    users: userFilters.list.map((user) => user.label),
                  },
                  {
                    cOnSuccess: () => {
                      handleModal(false);
                      setAlias('');
                      resetStates();
                      dispatch(resetUsersWorker('users', []));
                      resetAliasId();
                      dispatch(getUserAliasWorker());
                    },
                  },
                ),
              );
            } else {
              dispatch(
                createUserAliasWorker(
                  { alias, users: userFilters.list.map((user) => user.label) },
                  {
                    cOnSuccess: () => {
                      handleModal(false);
                      resetStates();
                      dispatch(resetUsersWorker('users', []));
                      dispatch(getUserAliasWorker());
                    },
                  },
                ),
              );
            }
          }}
          label={aliasId === '' ? 'CREATE ALIAS' : 'UPDATE ALIAS'}
        />
      </div>
    </Dialog>
  );
};
