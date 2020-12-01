import React, { FC, Fragment, useEffect } from 'react';
import EasyEdit from 'react-easy-edit';
import shortid from 'shortid';

import { TableRow, TableCell } from '@material-ui/core';
import { Button } from '@components/ui-kit/button';

import { Task, ReportResponse } from '@store/report/types';
import { updateUserState } from '@utils/state-updater';

import { TaskRow } from './task-row';

import { UserRowProps } from './types';

import './user-row.scss';
import 'react-quill/dist/quill.snow.css';

export const UserRow: FC<UserRowProps> = ({
  user: {
    tasks, name, timeSpent,
  }, userIndex, updateReport,
}) => {
  const userUpdater = updateUserState(userIndex);

  useEffect(() => {
    if(!tasks.length) {
      deleteUser(userIndex);
    }
  }, [tasks]);

  const addTask = () => {
    updateReport((prevState: ReportResponse) => {
      const newState = prevState.users.map((u, i) => (i === userIndex
        ? {
          ...u,
          tasks: [...u.tasks, {
            name: '',
            comment: '',
            timeSpent: '0',
          }],
        } : u));
      return { ...prevState, users: newState };
    });
  };

  const deleteUser = (userIndex: number) => {
    updateReport((prevState: ReportResponse) => {
      const usersList = prevState.users.filter((u, i) => i !== userIndex);
      return { ...prevState, users: usersList };
    })
  }

  return (
    <>
      <TableRow className="info top-border">
        <TableCell colSpan={4}>
          <div className="user-name">
            <EasyEdit
              type="text"
              value={name}
              hideSaveButton
              hideCancelButton
              onSave={(value: string) => {
                updateReport((prevState: ReportResponse) => userUpdater(prevState, 'name', value));
              }}
            />
            <Button label="Add Task" onClick={addTask} />
          </div>
        </TableCell>
      </TableRow>
      {
      tasks.map((task: Task, taskIndex: number) => (
        <Fragment key={shortid.generate()}>
          <TaskRow
            task={task}
            userIndex={userIndex}
            taskIndex={taskIndex}
            updateReport={updateReport}
          />
        </Fragment>
      ))
    }
      <TableRow className="info bottom-border">
        <TableCell colSpan={4}>
          <div className="info__total">
            Worklog Report total:
            {' '}
            {timeSpent}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
