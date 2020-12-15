import React, {
  ChangeEvent,
  FC,
  useState,
  useEffect,
} from 'react';
import { SshModalProps } from '@pages/projects-page/ssh-modal/types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  getRepositoryBySshWorker,
  getAliasRepositoriesWorker,
  getRepositoriesWorker,
  getSshKeyWorker,
} from '@store/repositories/repositories.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';
import { getSshKey } from '@store/repositories/repositories.selectors';

export const SshModal: FC<SshModalProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [aliasName, setAliasName] = useState<string>('');
  const [sshUrl, setSshUrl] = useState<string>('');

  const { publicKey } = useSelector(getSshKey);

  const resetStates = () => {
    setSshUrl('');
    setAliasName('');
    setOpen(false);
  };

  const useStylesModal = makeStyles({
    paper: {
      padding: 25,
    },
  });
  const classesModal = useStylesModal();

  useEffect(() => {
    if (open) {
      dispatch(getSshKeyWorker());
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        resetStates();
      }}
      classes={classesModal}
      fullWidth
    >
      <div>
        <Input label="SSH" value={sshUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setSshUrl(e.target.value)} />
        <Input label="Alias" value={aliasName} onChange={(e: ChangeEvent<HTMLInputElement>) => setAliasName(e.target.value)} />
        <Input label="SSH public key for the version-control system" value={publicKey} />
        <div className="button">
          <Button
            label="CREATE ALIAS"
            disabled={!aliasName?.length}
            onClick={(): void => {
              dispatch(getRepositoryBySshWorker(
                { sshUrl, alias: aliasName },
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
