import React, { FC, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { PAGES } from '@router/pages';
import { useHistory } from 'react-router-dom';

import { loginWorker } from '@store/auth/auth.actions';

import './login.scss';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState<boolean>(false);

  return (
    <div className="login">
      <div className="login__form">
        <GoogleLogin
          clientId={process.env.GOOGLE_LOGIN_ID || ''}
          className="login__button"
          responseType="code"
          onSuccess={(res) => dispatch(loginWorker({ code: res.code }, {
            cOnSuccess: () => history.push(PAGES.REPORT_PAGE),
          }))}
          onFailure={() => setErrors(true)}
        />

        {errors && <div className="login__error">Something went wrong!</div>}
      </div>
    </div>
  );
};
