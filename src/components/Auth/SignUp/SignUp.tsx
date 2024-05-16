import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm/SignUpForm';

const SignUp: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold text-gray-700 text-center">Sign up</h1>
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">Already have an account?</span>
        <Link to={RoutePaths.LOGIN} className="ml-3 cursor-pointer">
          Log in
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
