import React, { FC, Fragment, useMemo } from 'react';
import shortid from 'shortid';
import ReactQuill from 'react-quill';

import {
  Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TableFooter,
} from '@material-ui/core';

import { User } from '@store/report/types';

import { UserRow } from './user-row';
import { ReportProps } from './types';

import './report.scss';

export const Report: FC<ReportProps> = ({
  report, updateReport, comment, setComment,
}) => {
  const memoizedUsers = useMemo(() => report?.users.map((user: User, index: number) => (
    <Fragment key={shortid.generate()}>
      <UserRow user={user} userIndex={index} updateReport={updateReport} />
    </Fragment>
  )), [report]);

  return (report ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header">
          <TableRow className="report-comment">
            <TableCell colSpan={4} align="left">
              <ReactQuill
                className="comment"
                value={comment}
                placeholder="Comments for report"
                onChange={(value) => {
                  setComment(value);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="reporter">Worklog Reporter / Issue</TableCell>
            <TableCell align="center" className="comment-title">Worklog Comment</TableCell>
            <TableCell align="center" className="worklog-date">Worklog Date</TableCell>
            <TableCell align="center" className="timelog">Time Logged</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(report?.users) && memoizedUsers}
        </TableBody>
        <TableFooter className="table-footer">
          <TableRow>
            <TableCell colSpan={4} className="report-total">
              Worklog Reporter total:
              {parseFloat(report.total).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : <h2 className="empty-worklog">There are no work logs on selected date</h2>);
};
