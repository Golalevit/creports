import React, { FC, useState } from 'react';
import { Button } from '@components/ui-kit/button';
import { Users } from '@pages/users-page/users';
import { AddAliasModal } from '@pages/users-page/modal';

export const UsersPage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <Button
        onClick={handleModal}
        label="ADD ALIAS"
      />
      <AddAliasModal onClose={handleModal} open={open} />
      <Users />
    </div>
  );
};
