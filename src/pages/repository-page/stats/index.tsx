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
  const allInsertions = stats.reduce((prev, curr) => prev + curr.insertions, 0);
  const allDeletions = stats.reduce((prev, curr) => prev + curr.deletions, 0);

  const memorizedUsers = useMemo(
    () => stats?.map((userStats) => {
      const percentInsertions = (userStats.insertions / (allInsertions / 100)).toFixed(2);
      const percentDeletions = (userStats.deletions / (allDeletions / 100)).toFixed(2);
      userStats = {
        ...userStats,
        percentInsertions,
        percentDeletions,
      };
      return (
        <Fragment key={shortid.generate()}>
          <UserRow stats={userStats} />
        </Fragment>
      );
    }),
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
              Percents(Insertions / Deletions / Overall)
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
