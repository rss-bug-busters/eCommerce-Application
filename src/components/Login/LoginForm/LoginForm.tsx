import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@components/ui/inputField/InputField';
import { LoginFormSchema, LoginFormType } from './LoginValidation/LoginValidation.types';
// import useUser from '@services/api/hooks/useUser';

const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
  // useUser().login(data.email,data.password)
  console.log(data);
};

const LoginForm: FC = function () {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

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
          id="passwordShow"
        />
        {/* <label htmlFor="passwordShow">Show Password</label> */}
        <span>Show Password</span>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center min-w-72 px-6 py-4 bg-gray-800 rounded-full font-semibold text-center text-white"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
