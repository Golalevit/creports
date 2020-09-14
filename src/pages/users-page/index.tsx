import React, { FC, useState } from 'react';
import { Button } from '@components/ui-kit/button';
import { Users } from '@pages/users-page/users';
import { AddAliasModal } from '@pages/users-page/modal';

export const UsersPage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [aliasId, setAliasId] = useState<string>('');

  const onClickSetAliasId = (id: string) => {
    setAliasId(id);
  };

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
        handleModal={setOpen}
        open={open}
        aliasId={aliasId}
      />
      <Users setAliasId={onClickSetAliasId} handleModal={handleModal} />
    </div>
  );
};
