import React, {
  ChangeEvent,
  FC,
  useState,
  useEffect,
} from 'react';
import { SshModalProps } from '@pages/projects-page/ssh-modal/types';
import { Checkbox, Dialog } from '@material-ui/core';
import { Autocomplete } from '@components/ui-kit/autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {
  getRepositoryBySshWorker,
  getAliasRepositoriesWorker,
  getRepositoriesWorker,
  getSshKeyWorker,
  getAliasesWorker,
} from '@store/repositories/repositories.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@components/ui-kit/input';
import { Button } from '@components/ui-kit/button';
import { getAliasesData, getSshKey } from '@store/repositories/repositories.selectors';
import { AliasesResponse } from '@store/repositories/types';
import './ssh-modal.scss';

export const SshModal: FC<SshModalProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [alias, setAlias] = useState<AliasesResponse[]>([]);
  const [customAlias, setCustomAlias] = useState<string>('');
  const [isCustomAlias, setIsCustomAlias] = useState<boolean>(false);
  const [sshUrl, setSshUrl] = useState<string>('');
  const { publicKey } = useSelector(getSshKey);
  const { aliases, aliasesLoading } = useSelector(getAliasesData);
  const filteredAliases = aliases ? aliases.filter((a) => a.value !== alias[0]?.value) : aliases;

  const aliasSelectHandle = (newValue) => {
    if (newValue.length > 0) {
      setAlias([...[newValue.shift()]]);
    } else {
      setAlias(newValue);
    }
  };

  const resetStates = () => {
    setSshUrl('');
    setAlias([]);
    setCustomAlias('');
    setIsCustomAlias(false);
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

  useEffect(() => {
    if (isCustomAlias) {
      setAlias([]);
    } else {
      setCustomAlias('');
    }
  }, [isCustomAlias]);

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
        <div className="ssh-inputs-box">
          {isCustomAlias
            ? <Input label="Custom alias" value={customAlias} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomAlias(e.target.value)} />
            : (
              <Autocomplete
                fetchOptions={getAliasesWorker}
                value={alias}
                onChange={(_, newVal: AliasesResponse[]) => aliasSelectHandle(newVal)}
                options={filteredAliases}
                label="Alias"
                isLoading={aliasesLoading}
              />
            )}
          <div className="checkBox-box">
            <Checkbox
              color="primary"
              checked={isCustomAlias}
              onChange={() => setIsCustomAlias(!isCustomAlias)}
            />
            <span>Custom</span>
          </div>
        </div>
        <Input label="SSH public key for the version-control system" value={publicKey} />
        <div className="button">
          <Button
            label="CREATE ALIAS"
            disabled={!alias.length && !customAlias.length}
            onClick={(): void => {
              dispatch(getRepositoryBySshWorker(
                { sshUrl, alias: isCustomAlias ? customAlias : alias[0].label },
                {
                  cOnSuccess: () => {
                    dispatch(getRepositoriesWorker());
                    dispatch(getAliasRepositoriesWorker(isCustomAlias ? customAlias : alias[0].label));
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
