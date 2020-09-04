import React, { FC } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { UserRowProps } from './types';
import './user-rows.scss';

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
        <p>{(stats.percent * 100).toFixed(1)}%</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
          {stats.byExt.map((ext) => <p>{ext.name} - {(ext.percent * 100).toFixed(1)}%</p>)}
      </TableCell>
    </TableRow>
  </>
);
