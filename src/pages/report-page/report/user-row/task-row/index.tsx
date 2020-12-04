import React, { FC, ChangeEvent } from 'react';
import EasyEdit from 'react-easy-edit';
import ReactQuill from 'react-quill';
import moment from 'moment';

import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { Button } from '@components/ui-kit/button';
import { ReportResponse, User, Task } from '@store/report/types';
import { updateTaksState, updateUserState } from '@utils/state-updater';
import { TaskRowProps } from './types';

import './task-row.scss';

export const TaskRow: FC<TaskRowProps> = ({
  task, userIndex, taskIndex, updateReport
}) => {
  const taskUpdater = updateTaksState(userIndex, taskIndex);
  const userUpdater = updateUserState(userIndex);

  const getTotalHours = (array: (User | Task)[]): number => array.reduce(
    (a, b) => Number(a) + Number(b.timeSpent),
    0,
  );

  const deleteTask = () => {
    updateReport((prevState: ReportResponse) => {
      const tasks = prevState.users[userIndex]?.tasks.filter(t => task.taskId !== t.taskId);
      const newUserState = userUpdater(prevState, 'tasks', tasks);
      const userTotalHours = getTotalHours(newUserState.users[userIndex].tasks);
      const newUserStateWithUpdateTotalHours= userUpdater(newUserState, 'timeSpent', userTotalHours);
      const totalReportHours = getTotalHours(newUserStateWithUpdateTotalHours.users);
      return { ...newUserStateWithUpdateTotalHours, total: `${totalReportHours}` };
    });
  };

  return (
    <TableRow className="worklog">
      <TableCell align="left">
        <EasyEdit
          type="text"
          value={task.name}
          hideSaveButton
          hideCancelButton
          onSave={(value: string) => {
            updateReport((prevState: ReportResponse) => taskUpdater(prevState, 'name', value));
          }}
        />
      </TableCell>
      <TableCell align="left">
        {task.showEditor ? (
          <ReactQuill
            className="comment"
            value={task.comment}
            onBlur={(v, u, ref) => {
              updateReport((prevState: ReportResponse) => taskUpdater(prevState, 'comment', ref.getHTML(), {
                showEditor: false,
              }));
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: task.comment }}
            onClick={() => {
              updateReport((prevState: ReportResponse) => taskUpdater(prevState, 'showEditor', true));
            }}
            className="comment comment-cell"
            aria-hidden="true"
          />
        )}
      </TableCell>
      <TableCell align="center">
        <div>{moment(task.date).format('YYYY-MM-DD')}</div>
      </TableCell>
      <TableCell align="center">
        <div className="timespent-box">
          <div className="timespent">
            <EasyEdit
              type="number"
              value={task.timeSpent}
              hideSaveButton
              hideCancelButton
              onSave={(value: string) => {
                updateReport((prevState: ReportResponse) => {
                  const newTaskState = taskUpdater(prevState, 'timeSpent', value);
                  const userTotalHours = getTotalHours(newTaskState.users[userIndex].tasks);
                  const newUserState = userUpdater(newTaskState, 'timeSpent', userTotalHours);
                  const totalReportHours = getTotalHours(newUserState.users);
                  return { ...newUserState, total: `${totalReportHours}` };
                });
              }}
            />
            <Checkbox
              color="primary"
              checked={!task.excluded}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateReport((prevState: ReportResponse) => taskUpdater(prevState, 'excluded', !e.target.checked));
              }}
            />
          </div>
          <div className="delete-btn-box">
            <Button label="X" onClick={deleteTask} />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};
