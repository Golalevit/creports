import React, { FC } from 'react';
import { Button } from '@components/ui-kit/button';
import { Users } from '@pages/users-page/users';

export const UsersPage: FC = () => (
  <div className="container">
    <Button
      label="ADD ALIAS"
    />
    <Users />
  </div>
);
