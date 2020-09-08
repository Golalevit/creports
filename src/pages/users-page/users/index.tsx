import React, { FC, useMemo, Fragment } from 'react';
import shortid from 'shortid';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell, TableBody,
} from '@material-ui/core';
import './users.scss';
import { UserRow } from '@pages/users-page/user-rows';

export const Users: FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell align="center" className="user-alias">
              User Alias
            </TableCell>
            <TableCell align="center" className="users">
              Users
            </TableCell>
            {/*<TableCell align="center" className="insert-delete">*/}
            {/*  Insertions / Deletions*/}
            {/*</TableCell>*/}
            {/*<TableCell align="center" className="percent">*/}
            {/*  Percents(Insertions / Deletions / Overall)*/}
            {/*</TableCell>*/}
            {/*<TableCell align="center" className="extensions">*/}
            {/*  Extensions*/}
            {/*</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody><UserRow /></TableBody>
      </Table>
    </TableContainer>
  );
};
