import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

import { InputProps } from './types';

import './input.scss';

export const Input: FC<InputProps> = ({
  label, value, onChange,
}) => (
  <div className="input">
    <TextField
      label={label}
      value={value}
      onChange={onChange}
    />
  </div>
);
