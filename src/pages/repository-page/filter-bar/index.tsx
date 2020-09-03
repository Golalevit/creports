import React, { FC } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Autocomplete } from '@components/ui-kit/autocomplete';
import { RangeDatePicker } from '@components/ui-kit/range-datepicker';
import { TextField } from '@material-ui/core';

import './filter-bar.scss';
import { AppDispatch } from '@store/types';
import { useDispatch } from 'react-redux';
import { getProjectUsers } from '@store/repositories/repositories.actions';
import { FilterBarProps } from './types';

export const FilterBar: FC<FilterBarProps> = ({
  filters,
  setFilters,
  showDatePicker,
  label,
  options,
  isLoading,
  onChange,
  fetchOptions,
  checked = false,
}) => {
  const validationSchema = yup.object().shape({
    url: yup.string().url().required(),
  });
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="filters">
      <div className="filters__projects">
        {checked ? (
          <div className="autocomplete">
            <Formik
              onSubmit={() => {}}
              initialValues={{ url: '' }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <TextField
                  id="url"
                  value={props.values.url}
                  error={!!props.errors.url}
                  onChange={(e) => {
                    dispatch(getProjectUsers({ url: e.target.value }));
                    props.handleChange('url')(e.target.value);
                  }}
                  fullWidth
                  label="Gitlab URL"
                />
              )}
            </Formik>
          </div>
        ) : (
          <Autocomplete
            fetchOptions={fetchOptions}
            value={filters.list}
            onChange={onChange}
            options={options}
            label={label}
            isLoading={isLoading}
          />
        )}
      </div>
      {showDatePicker && (
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
      )}
    </div>
  );
};
