import { UsersResponse } from '@store/users/types';

export interface UsersProps {
  handleModal: () => void;
  users: UsersResponse[];
  setAliasId: (id: string) => void;
}
