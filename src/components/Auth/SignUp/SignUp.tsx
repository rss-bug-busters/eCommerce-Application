import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm/SignUpForm';

const SignUp: FC = function () {
  return (
    <div>
      <h1>Sign up</h1>
      <span>Already have an account?</span>
      <Link to={RoutePaths.LOGIN}>Log in</Link>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
