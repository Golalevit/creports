import { UsersResponse } from '@store/users/types';

export interface UserRowProps {
  user: UsersResponse;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
