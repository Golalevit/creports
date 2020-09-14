import React, { FC, useEffect, useState } from 'react';
import { Button } from '@components/ui-kit/button';
import { Users } from '@pages/users-page/users';
import { AddAliasModal } from '@pages/users-page/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersData } from '@store/users/users.selectors';
import { getUsersWorker } from '@store/users/users.actions';
import { Spinner } from '@components/spinner';

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector(getUsersData);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsersWorker());
    }
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [aliasId, setAliasId] = useState<string>('');

  const handleModal = () => {
    setOpen(!open);
  };

  const resetAliasId = () => {
    setAliasId('');
  };

  return (
    <div className="container">
      <Button onClick={handleModal} label="ADD ALIAS" />
      <AddAliasModal
        resetAliasId={resetAliasId}
        handleModal={() => setOpen(!open)}
        open={open}
        aliasId={aliasId}
      />
      {usersLoading ? (
        <Spinner />
      ) : (
        <Users users={users} setAliasId={setAliasId} handleModal={() => setOpen(!open)} />
      )}
    </div>
  );
};
