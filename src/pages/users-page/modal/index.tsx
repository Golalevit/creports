import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
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
import { Autocomplete } from '@components/ui-kit/autocomplete';
import { UsersFilter } from '@store/users/types';

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
    projects: [],
    users: [],
  });

  const [alias, setAlias] = useState<string>('');

  const resetStates = () => {
    setFilters({
      startDate: null,
      endDate: null,
      projects: [],
      users: [],
    });
  };

  useEffect(() => {
    if (!aliasOptions) {
      setFilters({
        ...filters,
        users: filters.users?.filter((filteredUser) =>
          users.some((user) => filteredUser.label === user.label),
        ),
      });
    }
  }, [users]);

  useEffect(() => {
    if (aliasOptions) {
      setAlias(aliasResult!.alias);
      setFilters({
        ...filters,
        users: aliasOptions,
      });
    }
  }, [aliasId]);

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
        <div className="filters">
          <div className="filters__projects">
            <Autocomplete
              fetchOptions={getRepositoriesWorker}
              value={filters.projects}
              onChange={(_, newVal: RepositoriesResponse[]) => {
                setFilters({
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
        </div>
        {users.length || aliasResult?.users.length ? (
          <div className="filters">
            <div className="filters__projects">
              <Autocomplete
                value={filters.users!}
                onChange={(_, newVal: UsersFilter[]) => setFilters({
                  ...filters, users: newVal,
                })}
                options={users}
                label="Users"
                isLoading={usersLoading}
              />
            </div>
          </div>
        ) : null}
        {filters.users?.length ? (
          <Input label="Alias" value={alias!} onChange={(e: ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)} />
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
                    users: filters.users?.map((user) => user.label),
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
                  { alias, users: filters.users?.map((user) => user.label) },
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
