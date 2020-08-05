export interface EmailConfig {
  to: string;
  bcc: string;
}

export interface FiltersConfig {
  startDate: Date | null;
  endDate: Date | null;
  projects: {
    label: string;
    value: number;
  }[];
}
