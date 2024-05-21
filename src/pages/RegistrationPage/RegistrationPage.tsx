import SignUp from '@components/Auth/SignUp/SignUp';
import { FC } from 'react';

const RegistrationPage: FC = function () {
  return (
    <div data-testid="registration-page">
      <SignUp />
    </div>
  );
};

export default RegistrationPage;
