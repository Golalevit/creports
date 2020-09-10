import React, { FC, useState } from 'react';
import { AddProjectAliasProps } from '@pages/projects-page/modal/tyes';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiltersConfig } from '@pages/stats-page/types';
import { FilterBar } from '@pages/stats-page/filter-bar';
import { getRepositoriesWorker, getUsersWorker } from '@store/repositories/repositories.actions';
import { useSelector } from 'react-redux';
import { getRepositoriesData } from '@store/repositories/repositories.selectors';
import { RepositoriesResponse } from '@store/repositories/types';

export const AddProjectAliasModal: FC<AddProjectAliasProps> = ({ open, setOpen }) => {
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
          options={repositories}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </Dialog>
  );
};
