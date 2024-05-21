import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import useUserQueries from '@services/api/hooks/useUserQueries';
import RoutePaths from '@utils/consts/RoutePaths';
import { LoginFormSchema, LoginFormType } from './LoginValidation/LoginValidation.types';

const LoginForm: FC = function () {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { login } = useUserQueries();
  const navigate = useNavigate();

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
        navigate(RoutePaths.MAIN);
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
      className="flex flex-col items-center gap-8 p-5 border border-gray-200 rounded-xl m-auto"
    >
      <div className="grid grid-cols-1 gap-5 md:gap-8">
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
          type="password"
        />
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
