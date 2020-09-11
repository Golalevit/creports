import { AliasRepositoriesResponse, RepositoriesResponse } from '@store/repositories/types';

export interface ProjectsProps {
  projects: AliasRepositoriesResponse[];
  setAliasName: (alias: string) => void;
  setOpen: (bool: boolean) => void;
}
