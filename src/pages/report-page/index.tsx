import React, {
  FC, useState, useEffect,
} from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Card } from '@material-ui/core';
import { getReport } from '@store/report/report.selectors';
import { getReportWorker, sendEmailWorker } from '@store/report/report.actions';
import { ReportResponce } from '@store/report/types';

import { Button } from '@components/ui-kit/button';
import { Spinner } from '@components/spinner';

import { EmailBar } from './email-bar';
import { FilterBar } from './filter-bar';
import { Report } from './report';
import { EmailConfig, FiltersConfig } from './types';

import './report-page.scss';
import 'react-toastify/dist/ReactToastify.css';

export const ReportPage: FC = () => {
  const dipatch = useDispatch();

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

  const [filters, setFilters] = useState<FiltersConfig>({
    startDate: new Date(),
    endDate: new Date(),
    projects: localStorage.getItem('projects')
      ? JSON.parse(localStorage.getItem('projects') || '{}') : [],
  });

  const _setFilters = (data: FiltersConfig) => {
    localStorage.setItem('projects', JSON.stringify(data.projects));

    setFilters(data);
  };

  const [updatedReport, setUpdatedReport] = useState<ReportResponce>();

  const generateReport = () => {
    dipatch(getReportWorker({
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

    dipatch(sendEmailWorker(data, {
      cOnSuccess: () => toast('Message Sent'),
    }));
  };

  useEffect(() => {
    setUpdatedReport(report);
  }, [report]);

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
