import React, { FC } from 'react';

import { TableRow, TableCell, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ProjectRowProps } from '@pages/projects-page/project-row/types';

export const ProjectRow: FC<ProjectRowProps> = ({ project, onEdit, onDelete }) => (
  <>
    <TableRow className="info top-border">
      <TableCell align="center" colSpan={1}>
        <p>{project.alias}</p>
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <p>{project.label}</p>
      </TableCell>
      <TableCell>
        <div className="icons">
          <Button onClick={() => onDelete(project.value)} type="button">
            <Delete />
          </Button>
          <Button onClick={() => onEdit(project.value)} type="button">
            <Edit />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </>
);
