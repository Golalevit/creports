import React, {
  FC, useMemo, Fragment,
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
import './projects.scss';
import { ProjectRow } from '@pages/projects-page/project-row';
import { ProjectsProps } from '@pages/projects-page/projects/types';
import { useDispatch } from 'react-redux';
import {
  addAliasWorker, deleteAliasWorker,
  getAliasRepositoriesWorker,
} from '@store/repositories/repositories.actions';

export const Projects: FC<ProjectsProps> = ({ projects, setAliasName, setOpen }) => {
  const dispatch = useDispatch();
  const onEdit = (alias: string) => {
    setOpen(true);
    setAliasName(alias);
  };

  const onDelete = (alias: string) => {
    dispatch(deleteAliasWorker(alias)({}, {
      cOnSuccess: () => {
        dispatch(getAliasRepositoriesWorker());
      },
    }));
  };

  const memoizedProjects = useMemo(
    () => projects?.map((project) => (
      <Fragment key={shortid.generate()}>
        <ProjectRow onDelete={onDelete} onEdit={onEdit} project={project} />
      </Fragment>
    )),
    [projects],
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell align="center" className="project-alias">
             Project Alias
            </TableCell>
            <TableCell align="center" className="project-name">
             Project Name
            </TableCell>
            <TableCell align="center" className="icons" />
          </TableRow>
        </TableHead>
        <TableBody>{memoizedProjects}</TableBody>
      </Table>
    </TableContainer>
  );
};
