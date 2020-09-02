import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsAuthenticatedData } from '@store/auth/auth.selectors';
import { checkAuthenticated } from '@store/auth/auth.actions';
import { Loader } from '@components/loader';
import { BrowserRouter } from '@router/index';
import { AppDispatch } from '@store/types';

export const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authIsLoading } = useSelector(getIsAuthenticatedData);

  useEffect(() => {
    (async () => { await dispatch(checkAuthenticated()); })();
  }, []);

  return authIsLoading ? <Loader /> : <BrowserRouter />;
};
