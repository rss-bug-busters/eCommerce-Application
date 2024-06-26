import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import useUserQueries from '@services/api/commercetools/hooks/useUserQueries';
import RoutePaths from '@utils/consts/RoutePaths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '@assets/svg/spinner.svg?react';
import { toast } from 'react-toastify';
import { LoginFormSchema, LoginFormType } from './LoginValidation/LoginValidation.types';

const LoginForm: FC = function () {
  const { login } = useUserQueries();
  const navigate = useNavigate();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: async () => {
      toast.success('Login successful!');
      await client.resetQueries();
      navigate(RoutePaths.MAIN);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        toast.dismiss();
        loginMutation.mutate(data);
      })}
      className="m-auto flex flex-col items-center gap-8 rounded-xl border border-gray-200 p-5 dark:bg-zinc-800 "
    >
      <div className="grid grid-cols-1 gap-5 md:gap-8">
        <InputField
          name="email"
          register={register('email')}
          placeholder="Email"
          error={errors.email}
          type="text"
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
        className="flex min-w-72 items-center justify-center rounded-full bg-gray-800 px-6 py-4 text-center font-semibold text-white dark:bg-zinc-600 dark:hover:bg-zinc-500"
      >
        {loginMutation.isPending && <Spinner className="mr-4 h-6 w-6 animate-spin" />}
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
