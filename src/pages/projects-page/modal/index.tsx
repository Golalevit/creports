import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { AddProjectAliasProps } from '@pages/projects-page/modal/types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiltersConfig } from '@pages/stats-page/types';
import {
  addAliasWorker,
  getAliasRepositoriesWorker,
  getRepositoriesWorker, getUsersWorker,
  updateAliasWorker,
} from '@store/repositories/repositories.actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAliasRepositories,
  getRepositoriesData,
} from '@store/repositories/repositories.selectors';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';
import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RepositoriesResponse } from '@store/repositories/types';

export const AddProjectAliasModal: FC<AddProjectAliasProps> = ({
  open,
  setOpen,
  aliasName,
  setAliasName,
}) => {
  const dispatch = useDispatch();
  const { repositories, repositoriesLoading } = useSelector(getRepositoriesData);
  const { aliasRepositories: projectAliases } = useSelector(getAliasRepositories);
  const filteredRepositories = repositories.filter((repo1) => projectAliases.every((repo2) => repo1.label !== repo2.alias));
  const [alias, setAlias] = useState<string>('');

  useEffect(() => {
    if (!repositories.length) {
      dispatch(getRepositoriesWorker());
    }
  }, []);

  const useStylesModal = makeStyles({
    paper: {
      padding: 25,
      height: 185,
    },
  });

  const classesModal = useStylesModal();

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: null,
    endDate: null,
    projects: [],
  });

  const resetStates = () => {
    setFilters({
      startDate: null,
      endDate: null,
      projects: [],
    });
    setAliasName(null);
    setAlias('');
  };

  useEffect(() => {
    if (aliasName) {
      const filtered = projectAliases.find((project) => project.alias === aliasName);
      setFilters({
        ...filters,
        projects: filtered!.projects.map((project, index) => ({ label: project, value: index })),
      });
      setAlias(aliasName);
    }
  }, [aliasName]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        resetStates();
      }}
      classes={classesModal}
      fullWidth
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
              }}
              options={filteredRepositories}
              label="Projects"
              isLoading={repositoriesLoading}
            />
          </div>
        </div>
        {filters.projects.length ? (
          <Input label="Alias" value={alias} onChange={(e: ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)} />
        ) : null}
      </div>
      <div className="button">
        <Button
          disabled={!alias.length}
          onClick={() => {
            if (aliasName) {
              dispatch(
                updateAliasWorker(aliasName)(
                  {
                    alias,
                    repos: filters.projects.map((item) => item.label),
                  },
                  {
                    cOnSuccess: () => {
                      setOpen(false);
                      dispatch(getAliasRepositoriesWorker());
                      resetStates();
                    },
                  },
                ),
              );
            } else {
              dispatch(
                addAliasWorker(
                  { alias, repos: filters.projects.map((item) => item.label) },
                  {
                    cOnSuccess: () => {
                      setOpen(false);
                      dispatch(getAliasRepositoriesWorker());
                      resetStates();
                    },
                  },
                ),
              );
            }
          }}
          label={aliasName ? 'UPDATE ALIAS' : 'CREATE ALIAS'}
        />
      </div>
    </Dialog>
  );
};
