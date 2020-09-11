export interface AddProjectAliasProps {
  open: boolean;
  setOpen: (boolean) => void;
  setProjectId: (id: number | null) => void;
  projectId: number | null;
}
