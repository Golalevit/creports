export interface AddAliasModalProps {
  open: boolean;
  handleModal: (open: boolean) => void;
  aliasId: string;
  resetAliasId: () => void;
}
