import { FC } from 'react';
import LoginForm from './loginForm';

const LoginPage: FC = function () {
  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
