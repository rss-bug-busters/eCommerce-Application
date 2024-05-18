import { ReactNode, useEffect } from 'react';
import useUserQueries from '@services/api/hooks/useUserQueries';

import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';

interface NeedAuthProperties {
  authorization?: 'password' | 'anonymous';
  children: ReactNode;
  fallback: ReactNode;
}

function ProtectedRoute({ children, fallback, authorization }: NeedAuthProperties) {
  const { user } = useUserQueries();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSuccess, isError, error } = useQuery<ClientResponse<Customer>, HttpErrorType>(
    {
      queryFn: user,
      queryKey: [QueryKeys.USER],
      retry: false,
    }
  );

  useEffect(() => {
    if (
      (error?.statusCode === 403 || error?.statusCode === 401) &&
      isError &&
      authorization === 'password'
    ) {
      navigate(RoutePaths.LOGIN, {
        state: {
          from: location,
        },
      });
    }
  }, [error, isError, location, navigate, authorization]);

  useEffect(() => {
    if (authorization === 'anonymous' && isSuccess) {
      navigate(RoutePaths.MAIN, {
        state: {
          from: location,
        },
      });
    }
  }, [isSuccess, location, navigate, authorization]);

  if (isError || isSuccess) {
    return children;
  }

  return fallback;
}

export default ProtectedRoute;
