import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

const Login: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold text-gray-700">Sign In</h1>
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">Already have an account?</span>
        <Link
          to={RoutePaths.REGISTRATION}
          className="font-bold text-blue-900 ml-2 cursor-pointer"
        >
          Sign Up
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
