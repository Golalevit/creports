import React, { FC, useEffect, useState } from 'react';
import { AddProjectAliasProps } from '@pages/projects-page/modal/types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiltersConfig } from '@pages/stats-page/types';
import { FilterBar } from '@pages/stats-page/filter-bar';
import {
  addAliasWorker,
  getAliasRepositoriesWorker,
  getRepositoriesWorker,
  updateAliasWorker,
} from '@store/repositories/repositories.actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAliasRepositories,
  getRepositoriesData,
} from '@store/repositories/repositories.selectors';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';

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
    list: [],
  });

  const resetStates = () => {
    setFilters({
      startDate: null,
      endDate: null,
      list: [],
    });
    setAliasName(null);
    setAlias('');
  };

  useEffect(() => {
    if (aliasName) {
      const filtered = projectAliases.find((project) => project.alias === aliasName);
      setFilters({
        ...filters,
        list: filtered!.projects.map((project, index) => ({ label: project, value: index })),
      });
      setAlias(aliasName);
    }
  }, [aliasName]);

  const onChange = (_, newVal: any) => {
    setFilters({
      list: newVal,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  };

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
        <FilterBar
          fetchOptions={getRepositoriesWorker}
          onChange={onChange}
          showDatePicker={false}
          label="Projects"
          isLoading={repositoriesLoading}
          options={filteredRepositories}
          filters={filters}
          setFilters={setFilters}
        />
        {filters.list.length ? (
          <Input label="Alias" value={alias} onChange={(e) => setAlias(e.target.value)} />
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
                    repos: filters.list.map((item) => item.label),
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
                  { alias, repos: filters.list.map((item) => item.label) },
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
