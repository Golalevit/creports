import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@components/ui-kit/button';
import { getAliasRepositories } from '@store/repositories/repositories.selectors';
import { getAliasRepositoriesWorker, getRepositoriesWorker } from '@store/repositories/repositories.actions';
import { AddProjectAliasModal } from '@pages/projects-page/modal';
import { SshModal } from '@pages/projects-page/ssh-modal';
import { Projects } from '@pages/projects-page/projects';
import { Spinner } from '@components/spinner';

export const ProjectsPage: FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [sshModalOpen, setSshModalOpen] = useState<boolean>(false);
  const [aliasName, setAliasName] = useState<string | null>(null);
  const { aliasRepositories: projectAliases, aliasRepositoriesLoading } = useSelector(getAliasRepositories);

  useEffect(() => {
    if (!projectAliases.length) {
      dispatch(getAliasRepositoriesWorker());
      dispatch(getRepositoriesWorker());
    }
  }, []);

  return (
    <div className="container">
      <Button onClick={() => setOpen(!open)} label="ADD ALIAS" />
      <Button onClick={() => setSshModalOpen(!sshModalOpen)} label="ADD ALIAS BY SSH" />
      <AddProjectAliasModal
        aliasName={aliasName}
        setOpen={setOpen}
        open={open}
        setAliasName={setAliasName}
      />
      <SshModal
        setOpen={setSshModalOpen}
        open={sshModalOpen}
      />
      {aliasRepositoriesLoading
        ? (<Spinner />)
        : (<Projects setOpen={setOpen} setAliasName={setAliasName} projects={projectAliases} />)}
    </div>
  );
};
