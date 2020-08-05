import React, { FC, useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Autocomplete as MAutocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AutocompleteProps } from './types';

import './autocomplete.scss';

export const Autocomplete: FC<AutocompleteProps> = ({
  label, options, isLoading = false, fetchOptions = () => {},
  value, onChange = () => {},
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (open && !isFetched) {
      setIsFetched(true);
      dispatch(fetchOptions());
    }
  }, [open]);

  return (
    <div className="autocomplete">
      <MAutocomplete
        multiple
        disableCloseOnSelect
        loading={isLoading}
        open={open}
        value={value}
        onChange={onChange}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};
