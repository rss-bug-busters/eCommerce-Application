import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import useCurrentUser from '@hooks/useCurrentUser';

interface NeedAuthProperties {
  authorization?: 'password' | 'anonymous';
  children: ReactNode;
  fallback: ReactNode;
}

function ProtectedRoute({ children, fallback, authorization }: NeedAuthProperties) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSuccess, isError, error } = useCurrentUser();

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
