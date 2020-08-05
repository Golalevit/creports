import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

import { RangeDatePickerProps } from './types';

import 'react-datepicker/dist/react-datepicker.css';
import './range-datepicker.scss';

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  startDate, endDate, onChange,
}) => (
  <div className="range">
    <div className="range__datepicker">
      <DatePicker
        selected={startDate}
        onChange={(date) => onChange({
          startDate: date,
          endDate,
        })}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
    </div>
    <div className="range__datepicker">
      <DatePicker
        selected={endDate}
        onChange={(date) => onChange({
          startDate,
          endDate: date,
        })}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  </div>
);
