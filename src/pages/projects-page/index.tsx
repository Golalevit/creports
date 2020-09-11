import React, { FC, useEffect, useState } from 'react';
import { Button } from '@components/ui-kit/button';
import { AddProjectAliasModal } from '@pages/projects-page/modal';
import { Projects } from '@pages/projects-page/projects';
import { useDispatch, useSelector } from 'react-redux';
import { getAliasRepositories } from '@store/repositories/repositories.selectors';
import { getAliasRepositoriesWorker } from '@store/repositories/repositories.actions';
import { Spinner } from '@components/spinner';

export const ProjectsPage: FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [aliasName, setAliasName] = useState<string | null>(null);
  const { aliasRepositories: projectAliases, aliasRepositoriesLoading } = useSelector(getAliasRepositories);

  useEffect(() => {
    if (!projectAliases.length) {
      dispatch(getAliasRepositoriesWorker());
    }
  }, []);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <Button onClick={handleModal} label="ADD ALIAS" />
      <AddProjectAliasModal
        aliasName={aliasName}
        setOpen={setOpen}
        open={open}
        setAliasName={setAliasName}
      />
      {aliasRepositoriesLoading
        ? (<Spinner />)
        : (<Projects setOpen={setOpen} setAliasName={setAliasName} projects={projectAliases} />)}
    </div>
  );
};
