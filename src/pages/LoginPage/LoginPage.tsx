import Login from '@components/Login/Login';
import { FC } from 'react';

const LoginPage: FC = function () {
  return (
    <div data-testid="login-page">
      <Login />
    </div>
  );
};

export default LoginPage;
