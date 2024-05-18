import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import AddressFields from '@components/AddressFields/AddressFields';
import { SignUpFormSchema, SignUpFormType } from './SignUpForm.types';

const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
  console.log(data);
};

const SignUpForm: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 items-center gap-8 max-w-xl border border-gray-200 rounded-xl p-2 m-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
