import { EmailConfig } from '../types';

export interface EmailbarProps {
  emails: EmailConfig;
  setEmails: (config: EmailConfig) => void;
}
