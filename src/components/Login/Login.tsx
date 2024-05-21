import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

const Login: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">Sign In</h1>
      <div className="flex items-center justify-center">
        <span className="text-sm dark:text-white/65 text-gray-500">
          Don`t have an account?
        </span>
        <Link
          to={RoutePaths.REGISTRATION}
          className="font-bold text-slate-700 ml-2 cursor-pointer hover:text-slate-300 hover:scale-110 dark:text-white "
        >
          Sign Up
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
