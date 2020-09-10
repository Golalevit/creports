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
import './projects.scss';
import { ProjectRow } from '@pages/projects-page/project-row';
import { UserRow } from '@pages/users-page/user-rows';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersWorker, deleteUsersAliasWorker } from '@store/users/users.actions';
import { getUsersData } from '@store/users/users.selectors';

export const Projects: FC = () => {
  // const memoizedUsers = useMemo(
  //   () => users?.map((user) => (
  //     <Fragment key={shortid.generate()}>
  //       <ProjectRow />
  //     </Fragment>
  //   )),
  //   [users],
  // );
  
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
       <TableBody>
         <ProjectRow />
       </TableBody>
     </Table>
   </TableContainer>
 );
}
