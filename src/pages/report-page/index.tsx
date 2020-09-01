import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Card } from '@material-ui/core';
import { getReport } from '@store/report/report.selectors';
import { getReportWorker, sendEmailWorker } from '@store/report/report.actions';
import { ReportResponse } from '@store/report/types';

import { Button } from '@components/ui-kit/button';
import { Spinner } from '@components/spinner';

import { EmailBar } from './email-bar';
import { FilterBar } from './filter-bar';
import { Report } from './report';
import { EmailConfig, FiltersConfig } from './types';

import './report-page.scss';
import 'react-toastify/dist/ReactToastify.css';

export const ReportPage: FC = () => {
  const dispatch = useDispatch();

  const { report, reportLoading } = useSelector(getReport);
  const [comment, setComment] = useState<string>('');

  const [emails, setEmails] = useState<EmailConfig>({
    to: `${localStorage.getItem('to') || ''}`,
    bcc: `${localStorage.getItem('bcc') || ''}`,
  });

  const _setEmails = (data: EmailConfig) => {
    localStorage.setItem('to', data.to);
    localStorage.setItem('bcc', data.bcc);

    setEmails(data);
  };

  const getLocalStorage = (key: string, defaultValue: Array<string> | Date) => (localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '{}') : defaultValue);

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: new Date(getLocalStorage('startDate', new Date())),
    endDate: new Date(getLocalStorage('endDate', new Date())),
    projects: getLocalStorage('projects', []),
  });

  const _setFilters = (data: FiltersConfig) => {
    localStorage.setItem('projects', JSON.stringify(data.projects));
    localStorage.setItem('startDate', JSON.stringify(data.startDate));
    localStorage.setItem('endDate', JSON.stringify(data.endDate));

    setFilters(data);
  };

  const [updatedReport, setUpdatedReport] = useState<ReportResponse>();

  const generateReport = () => {
    dispatch(getReportWorker({
      startDate: moment(filters.startDate).startOf('day').format('YYYY-MM-DD'),
      endDate: moment(filters.endDate).endOf('day').format('YYYY-MM-DD'),
      projects: filters.projects.map((p: { label: string; value: number }) => p.value),
    }));
  };

  const sendEmail = () => {
    const data = {
      ...emails,
      usersWorklogs: updatedReport?.users,
      reportComment: comment,
      reportDate: moment().format('YYYY-MM-DD'),
    };

    dispatch(sendEmailWorker(data, {
      cOnSuccess: () => toast('Message Sent'),
    }));
  };

  useEffect(() => {
    setUpdatedReport(report);
  }, [report]);

  useEffect(() => {
    if (filters.projects && filters.startDate && filters.endDate) {
      generateReport();
    }
  }, []);

  return (
    <div className="report">
      <Card variant="outlined">
        <div className="report__controls">
          <EmailBar emails={emails} setEmails={_setEmails} />
          <div className="report__controls__filters">
            <FilterBar filters={filters} setFilters={_setFilters} />
            <div className="filters__controlls__filters__btns">
              <Button
                label="SEND"
                disabled={reportLoading || !emails.to}
                onClick={sendEmail}
              />
              <Button
                label="GENERATE"
                onClick={generateReport}
                disabled={reportLoading || !filters.projects.length}
              />
            </div>
          </div>
        </div>
      </Card>
      {reportLoading ? <Spinner /> : (
        <Report
          report={updatedReport}
          updateReport={setUpdatedReport}
          comment={comment}
          setComment={setComment}
        />
      )}
      <ToastContainer />
    </div>
  );
};
