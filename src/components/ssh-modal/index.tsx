import React, { ChangeEvent, FC, useState } from 'react';
import { SshModalProps } from '@components/ssh-modal/types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchRepositoriesBySshWorker, getAliasRepositoriesWorker, getRepositoriesWorker } from '@store/repositories/repositories.actions';
import { useDispatch } from 'react-redux';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';

export const SshModal: FC<SshModalProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [aliasName, setAliasName] = useState<string>('');
  const [sshUrl, setSshUrl] = useState<string>('');
  const [sshPrivateKey, setSshPrivateKey] = useState<string>('');

  const resetStates = () => {
    setSshUrl('');
    setSshPrivateKey('');
    setAliasName('');
    setOpen(false);
  };

  const useStylesModal = makeStyles({
    paper: {
      padding: 25,
    },
  });
  const classesModal = useStylesModal();

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      classes={classesModal}
      fullWidth
    >
      <div>
        <Input label="SSH" value={sshUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setSshUrl(e.target.value)} />
        <Input label="SSH private key" value={sshPrivateKey} onChange={(e: ChangeEvent<HTMLInputElement>) => setSshPrivateKey(e.target.value)} />
        <Input label="Alias" value={aliasName} onChange={(e: ChangeEvent<HTMLInputElement>) => setAliasName(e.target.value)} />
        <div className="button">
          <Button
            label="CREATE ALIAS"
            disabled={!aliasName?.length}
            onClick={(): void => {
              dispatch(fetchRepositoriesBySshWorker(
                { sshUrl, sshPrivateKey, alias: aliasName },
                {
                  cOnSuccess: () => {
                    dispatch(getRepositoriesWorker());
                    dispatch(getAliasRepositoriesWorker(aliasName));
                    resetStates();
                  },
                },
              ));
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};
