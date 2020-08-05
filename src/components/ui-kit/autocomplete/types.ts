import { ChangeEvent } from 'react';

interface Value {
  label: string;
  value: number;
}

export interface AutocompleteProps {
  label: string;
  options: Value[];
  isLoading?: boolean;
  fetchOptions?: () => void;
  value: Value[];
  onChange: (event: ChangeEvent<{}>, type: Value[]) => void;
}
