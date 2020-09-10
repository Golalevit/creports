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
  TableCell,
  TableBody,
} from '@material-ui/core';
import './users.scss';
import { UserRow } from '@pages/users-page/user-rows';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersWorker, deleteUsersAliasWorker } from '@store/users/users.actions';
import { getUsersData } from '@store/users/users.selectors';
import { UsersProps } from './types';

export const Users: FC<UsersProps> = ({ handleModal, setAliasId }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(getUsersData);

  useEffect(() => {
    dispatch(getUsersWorker());
  }, []);

  const onDelete = (id: string) => {
    dispatch(deleteUsersAliasWorker(id)(null, { cOnSuccess: () => dispatch(getUsersWorker()) }));
  };

  const onEdit = (id: string) => {
    handleModal();
    setAliasId(id);
  };

  const memoizedUsers = useMemo(
    () => users?.map((user) => (
      <Fragment key={shortid.generate()}>
        <UserRow onEdit={onEdit} onDelete={onDelete} user={user} />
      </Fragment>
    )),
    [users],
  );

  return users.length ? (
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
            <TableCell align="center" className="icons" />
          </TableRow>
        </TableHead>
        <TableBody>{memoizedUsers}</TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h2>No user aliases yet.</h2>
  );
};
