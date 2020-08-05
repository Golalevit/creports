import React, { FC } from 'react';

import './spinner.scss';

export const Spinner: FC = () => (
  <div className="spinner">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div>
);
