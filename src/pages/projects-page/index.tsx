import React, { FC, useState } from 'react';
import { Button } from '@components/ui-kit/button';
import { Users } from '@pages/users-page/users';
import { AddAliasModal } from '@pages/users-page/modal';
import { AddProjectAliasModal } from '@pages/projects-page/modal';
import { Projects } from '@pages/projects-page/projects';

export const ProjectsPage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <Button onClick={handleModal} label="ADD ALIAS" />
      <AddProjectAliasModal
        setOpen={setOpen}
        open={open}
      />
      <Projects />
      {/*<AddAliasModal*/}
      {/*  resetAliasId={resetAliasId}*/}
      {/*  handleModal={setOpen}*/}
      {/*  open={open}*/}
      {/*  aliasId={aliasId}*/}
      {/*/>*/}
      {/*<Users setAliasId={onClickSetAliasId} handleModal={handleModal} />*/}
    </div>
  );
};
