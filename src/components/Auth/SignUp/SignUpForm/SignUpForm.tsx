import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import AddressFields from '@components/AddressFields/AddressFields';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import Spinner from '@assets/svg/spinner.svg?react';
import { SignUpFormSchema, SignUpFormType } from './SignUpForm.types';

const SignUpForm: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const { register: signUp, login } = useUserQueries();
  const [submitError, setSubmitError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    const { name, surname, dateOfBirth, email, password, address } = data;

    const newUser: MyCustomerDraft = {
      email,
      password,
      firstName: name,
      lastName: surname,
      dateOfBirth,
      addresses: [address],
    };

    try {
      setIsLoading(true);
      setSubmitError('');
      await signUp(newUser);
      await login(email, password);
      navigate(RoutePaths.MAIN);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-8 max-w-xl border border-gray-200 rounded-xl p-2 m-auto"
    >
      <div className="flex flex-wrap gap-8">
        <InputField
          name="name"
          register={register('name')}
          placeholder="Name"
          error={errors.name}
        />
        <InputField
          name="surname"
          register={register('surname')}
          placeholder="Surname"
          error={errors.surname}
        />
        <InputField
          name="dateOfBirth"
          register={register('dateOfBirth')}
          placeholder="Date of birth"
          error={errors.dateOfBirth}
          type="date"
        />
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
        <InputField
          name="confirmPassword"
          register={register('confirmPassword')}
          placeholder="Confirm password"
          error={errors.confirmPassword}
          type="password"
        />
      </div>
      <h2 className=" text-xl text-center -mb-4">Address</h2>
      <AddressFields errors={errors} register={register} />
      <button
        type="submit"
        className="flex items-center justify-center min-w-72 px-6 py-4 bg-gray-800 rounded-full font-semibold text-center text-white"
      >
        {isLoading && <Spinner className="w-6 h-6 mr-4 animate-spin" />}
        Sign Up
      </button>
      {submitError && <p className="text-red-600">{submitError}</p>}
    </form>
  );
};

export default SignUpForm;
