import React, { FC } from 'react';

import { Input } from '@components/ui-kit/input';

import { EmailbarProps } from './types';

import './email-bar.scss';

export const EmailBar: FC<EmailbarProps> = ({
  emails, setEmails,
}) => (
  <div className="emailbar">
    <Input label="Emails" value={emails.to} onChange={(e) => setEmails({ to: e.target.value, bcc: emails.bcc })} />
    <Input label="BCC" value={emails.bcc} onChange={(e) => setEmails({ bcc: e.target.value, to: emails.to })} />
  </div>
);
