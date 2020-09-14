import React, { FC } from 'react';

import { TableRow, TableCell, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { UserRowProps } from '@pages/users-page/user-rows/types';

import './user-rows.scss';

export const UserRow: FC<UserRowProps> = ({ user, onDelete, onEdit }) => (
  <>
    <TableRow className="info top-border">
      <TableCell align="center" colSpan={1}>
        <p>{user.alias}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        {user.users.map((u) => (
          <p>{u}</p>
        ))}
      </TableCell>
      <TableCell>
        <div className="icons">
          <Button onClick={() => onDelete(user.id)} type="button">
            <Delete />
          </Button>
          <Button onClick={() => onEdit(user.id)} type="button">
            <Edit />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </>
);
