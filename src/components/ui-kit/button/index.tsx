import React, { FC } from 'react';
import { Button as MButton } from '@material-ui/core';

import { ButtonProps } from './types';

import './button.scss';

export const Button: FC<ButtonProps> = ({
  label = '', onClick = () => {}, disabled,
}) => (
  <MButton disabled={disabled} variant="outlined" onClick={onClick}>{label}</MButton>
);
