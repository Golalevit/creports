import { AliasRepositoriesResponse } from '@store/repositories/types';

export interface ProjectRowProps {
  project: AliasRepositoriesResponse;
  onEdit: (id: string) => void;
  onDelete: (alias: string) => void;
}
