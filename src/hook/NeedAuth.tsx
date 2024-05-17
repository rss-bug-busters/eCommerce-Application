import { ReactNode, useEffect } from 'react';
import useUser from '@services/api/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';

interface NeedAuthProperties {
  authType?: 'password' | 'anonymous';
  children: ReactNode;
  fallback: ReactNode;
}

function NeedAuth({ children, fallback, authType = 'password' }: NeedAuthProperties) {
  const { getMe: userQuery } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSuccess, isError, error } = useQuery<ClientResponse<Customer>, HttpErrorType>(
    {
      queryFn: userQuery,
      queryKey: ['user'],
      retry: false,
    }
  );

  useEffect(() => {
    if (error?.statusCode === 403 && isError && authType === 'password') {
      navigate(RoutePaths.LOGIN, {
        state: {
          from: location,
        },
      });
    }
  }, [error, isError, location, navigate, authType]);

  useEffect(() => {
    if (authType === 'anonymous' && isSuccess) {
      navigate(RoutePaths.MAIN, {
        state: {
          from: location,
        },
      });
    }
  }, [isSuccess, location, navigate, authType]);

  if (isError || isSuccess) {
    return children;
  }

  return fallback;
}

export default NeedAuth;
