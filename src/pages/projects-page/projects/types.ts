import { AliasRepositoriesResponse, RepositoriesResponse } from '@store/repositories/types';

export interface ProjectsProps {
  projects: AliasRepositoriesResponse[];
  setProjectId: (id: number) => void;
  setOpen: (bool: boolean) => void;
}
