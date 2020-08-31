import { ReportResponse } from '@store/report/types';

export const updateTaksState = (userIndex: number, taskIndex: number) => (
  prevState: ReportResponse,
  field: string,
  value: any,
  addtional: {} = {},
) => {
  const newTasksState = prevState
    .users[userIndex]
    .tasks
    .map((t, i) => (i === taskIndex
      ? { ...t, [field]: value, ...addtional } : t));

  const newState = prevState.users.map((u, i) => (i === userIndex
    ? { ...u, tasks: newTasksState } : u));

  return { ...prevState, users: newState };
};

export const updateUserState = (userIndex: number) => (
  prevState: ReportResponse,
  field: string,
  value: any,
) => {
  const newState = prevState.users.map((u, i) => (i === userIndex
    ? { ...u, [field]: value } : u));
  return { ...prevState, users: newState };
};
