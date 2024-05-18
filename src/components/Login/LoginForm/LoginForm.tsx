import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@components/ui/inputField/InputField';
import useUser from '@services/api/hooks/useUser';
import RoutePaths from '@utils/consts/RoutePaths';
import { LoginFormSchema, LoginFormType } from './LoginValidation/LoginValidation.types';

const LoginForm: FC = function () {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { login, getMe } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedStatus = async () => {
      try {
        const { body } = await getMe();

        if (body.authenticationMode === 'Password') {
          // navigate(RoutePaths.MAIN);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };

    checkLoggedStatus().catch((error) =>
      console.error('Error in checkLoggedStatus:', error)
    );
  }, [getMe, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      setErrorMessage(undefined);
      const response = await login(data.email, data.password);
      const { statusCode } = response;

      if (statusCode === 200) {
        const { body } = response;

        navigate(RoutePaths.MAIN);
        console.log(body);
      }
    } catch (error) {
      const errorServerMessage = error instanceof Error ? error.message : String(error);

      setErrorMessage(errorServerMessage);
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      setErrorMessage(undefined);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-8 max-w-xl border border-gray-200 rounded-xl p-2 m-auto"
    >
      <div className="flex flex-wrap gap-8">
        <InputField
          name="email"
          register={register('email')}
          placeholder="Email"
          error={errors.email}
          type="email"
        />
        <InputField
          name="password"
          register={register('password')}
          placeholder="Password"
          error={errors.password}
          type={showPassword ? 'text' : 'password'}
        />
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((previous: boolean) => !previous)}
          className="relative left-80"
        />
        {/* <label htmlFor="passwordShow">Show Password</label> */}
        <span className="relative absolute left-80 ">Show Password</span>
      </div>
      <button
        data-testid="login-page-submit-button"
        type="submit"
        className="flex items-center justify-center min-w-72 px-6 py-4 bg-gray-800 rounded-full font-semibold text-center text-white"
      >
        Sign In
      </button>
      <p className="text-red-600">{errorMessage}</p>
    </form>
  );
};

export default LoginForm;
