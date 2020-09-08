import React, { FC } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { UserRowProps } from '@pages/users-page/user-rows/types';

export const UserRow: FC<UserRowProps> = ({ user }) => (
  <>
    <TableRow className="info top-border">
      <TableCell align="center" colSpan={1}>
        <p>{user.alias}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        {user.users.map((u) => (<p>{u}</p>))}
      </TableCell>
    </TableRow>
  </>
);
