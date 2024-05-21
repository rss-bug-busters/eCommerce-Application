import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm/SignUpForm';

const SignUp: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">Sign up</h1>
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-white/65">
          Already have an account?
        </span>
        <Link
          to={RoutePaths.LOGIN}
          className="font-bold text-slate-700 ml-2 cursor-pointer hover:text-slate-500 hover:scale-110 dark:text-white "
        >
          Log in
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
