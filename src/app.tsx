import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsAuthenticatedData } from '@store/auth/auth.selectors';
import { userAuthenticatedWorker } from '@/store/auth/auth.actions';
import { Loader } from '@components/loader';
import { BrowserRouter } from '@/router';

export const App: FC = () => {
  const dispacth = useDispatch();
  const { authIsLoading } = useSelector(getIsAuthenticatedData);

  useEffect(() => {
    (async () => { dispacth(userAuthenticatedWorker()); })();
  }, []);

  return authIsLoading ? <Loader /> : <BrowserRouter />;
};
