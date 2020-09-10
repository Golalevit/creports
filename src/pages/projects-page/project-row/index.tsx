import React, { FC } from 'react';

import { TableRow, TableCell, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { UserRowProps } from '@pages/users-page/user-rows/types';

// import './user-rows.scss';

export const ProjectRow: FC = () => (
  <>
    <TableRow className="info top-border">
      <TableCell align="center" colSpan={1}>
        <p>poka</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <p>privet</p>
      </TableCell>
      <TableCell>
        <div className="icons">
          <Button onClick={() => {}} type="button">
            <Delete />
          </Button>
          <Button onClick={() => {}} type="button">
            <Edit />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </>
);
