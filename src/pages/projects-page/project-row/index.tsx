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
        {project.projects.map((projectName) => (<p key={projectName}>{projectName}</p>))}
      </TableCell>
      <TableCell>
        <div className="icons">
          <Button onClick={() => onDelete(project.alias)} type="button">
            <Delete />
          </Button>
          <Button onClick={() => onEdit(project.alias)} type="button">
            <Edit />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </>
);
