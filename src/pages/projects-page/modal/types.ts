export interface AddProjectAliasProps {
  open: boolean;
  setOpen: (boolean) => void;
  setAliasName: (alias: string | null) => void;
  aliasName: string | null;
}
