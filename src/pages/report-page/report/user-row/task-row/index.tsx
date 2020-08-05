import React, { FC, ChangeEvent } from 'react';
import EasyEdit from 'react-easy-edit';
import ReactQuill from 'react-quill';
import moment from 'moment';

import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { ReportResponce } from '@store/report/types';
import { updateTaksState, updateUserState } from '@utils/state-updater';
import { TaskRowProps } from './types';

import './task-row.scss';

export const TaskRow: FC<TaskRowProps> = ({
  task, userIndex, taskIndex, updateReport,
}) => {
  const taskUpdater = updateTaksState(userIndex, taskIndex);
  const userUpdater = updateUserState(userIndex);

  return (
    <TableRow className="worklog">
      <TableCell align="left">
        <EasyEdit
          type="text"
          value={task.name}
          hideSaveButton
          hideCancelButton
          onSave={(value: string) => {
            updateReport((prevState: ReportResponce) => taskUpdater(prevState, 'name', value));
          }}
        />
      </TableCell>
      <TableCell align="left">
        {
        task.showEditor ? (
          <ReactQuill
            className="comment"
            value={task.comment}
            onBlur={(v, u, ref) => {
              updateReport((prevState: ReportResponce) => taskUpdater(prevState, 'comment', ref.getHTML(), {
                showEditor: false,
              }));
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: task.comment }}
            onClick={() => {
              updateReport((prevState: ReportResponce) => taskUpdater(prevState, 'showEditor', true));
            }}
            className="comment comment-cell"
            aria-hidden="true"
          />
        )
      }
      </TableCell>
      <TableCell align="center">
        <div>
          {moment(task.date).format('YYYY-MM-DD')}
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="timespent">
          <EasyEdit
            type="number"
            value={task.timeSpent}
            hideSaveButton
            hideCancelButton
            onSave={(value: string) => {
              updateReport((prevState: ReportResponce) => {
                const newTaskState = taskUpdater(prevState, 'timeSpent', value);
                const userTotalHours = newTaskState.users[userIndex]
                  .tasks
                  .reduce((a, b) => Number(a) + Number(b.timeSpent), 0);
                const newUserState = userUpdater(newTaskState, 'timeSpent', userTotalHours);

                const totalReportHours = newUserState.users
                  .reduce((a, b) => Number(a) + Number(b.timeSpent), 0);

                return { ...newUserState, total: `${totalReportHours}` };
              });
            }}
          />
          <Checkbox
            color="primary"
            checked={!task.excluded}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              updateReport((prevState: ReportResponce) => taskUpdater(
                prevState,
                'excluded',
                !e.target.checked,
              ));
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
