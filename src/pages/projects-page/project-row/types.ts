export interface ProjectRowProps {
  project: {
    value: number;
    alias: string;
    label: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
