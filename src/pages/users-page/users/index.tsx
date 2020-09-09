import React, {
  FC, useMemo, Fragment, useEffect,
} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getUsersWorker } from '@store/users/users.actions';
import { getUsersData } from '@store/users/users.selectors';

export const Users: FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(getUsersData);

  useEffect(() => {
    dispatch(getUsersWorker());
  }, []);

  const memoizedUsers = useMemo(() => users?.map((user) => (
    <Fragment key={shortid.generate()}>
      <UserRow user={user} />
    </Fragment>
  )), [users]);

  return (users.length ? (
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
          </TableRow>
        </TableHead>
        <TableBody>{memoizedUsers}</TableBody>
      </Table>
    </TableContainer>
  ) : <h2>No user aliases yet.</h2>
  );
};
