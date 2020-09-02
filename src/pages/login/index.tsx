import React, { FC, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { PAGES } from '@router/pages';
import { useHistory } from 'react-router-dom';

import { loginUser } from '@store/auth/auth.actions';

import './login.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '@store/types';

export const LoginPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState<boolean>(false);
  const onSuccess = async (res) => {
    try {
      unwrapResult(await dispatch(loginUser(res.code)));
      history.push(PAGES.REPORT_PAGE);
    } catch {}
  };

  return (
    <div className="login">
      <div className="login__form">
        <GoogleLogin
          clientId={process.env.GOOGLE_LOGIN_ID || ''}
          className="login__button"
          responseType="code"
          onSuccess={(res) => onSuccess(res)}
          onFailure={() => setErrors(true)}
        />

        {errors && <div className="login__error">Something went wrong!</div>}
      </div>
    </div>
  );
};
