import React, { FC, useMemo, Fragment } from 'react';
import shortid from 'shortid';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { UserRow } from '../user-rows';
import './stats.scss';
import { StatsProps } from './types';

export const Stats: FC<StatsProps> = ({ stats }) => {
  const memorizedUsers = useMemo(
    () => stats?.map((userStats) => (
      <Fragment key={shortid.generate()}>
        <UserRow stats={userStats} />
      </Fragment>
    )),
    [stats],
  );
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell align="center" className="user">
              User
            </TableCell>
            <TableCell align="center" className="commits">
              Commits
            </TableCell>
            <TableCell align="center" className="insert-delete">
              Insertions / Deletions
            </TableCell>
            <TableCell align="center" className="percent">
              Percents
            </TableCell>
            <TableCell align="center" className="extensions">
              Extensions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{memorizedUsers}</TableBody>
      </Table>
    </TableContainer>
  );
};
