import React, { FC } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { UserRowProps } from './types';

export const UserRow: FC<UserRowProps> = ({ stats }) => (
  <>
    <TableRow className="info top-border">
      <TableCell align="center" colSpan={1}>
        <p>{stats.name}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <p>{stats.commits}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <p>{`+${stats.insertions} / -${stats.deletions}`}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <p>{stats.graphPercent}</p>
      </TableCell>
    </TableRow>
  </>
);
