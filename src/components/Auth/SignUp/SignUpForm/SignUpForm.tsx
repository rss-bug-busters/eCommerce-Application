import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Name" />
        <div data-testid="error-name">{errors.name?.message}</div>
        <input {...register('surname')} placeholder="Surname" />
        <div data-testid="error-surname">{errors.surname?.message}</div>
        <input type="email" {...register('email')} placeholder="Email" />
        <div data-testid="error-email">{errors.email?.message}</div>
        <input type="password" {...register('password')} placeholder="Password" />
        <div data-testid="error-password">{errors.password?.message}</div>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm password"
        />
        <div data-testid="error-confirmPassword">{errors.confirmPassword?.message}</div>
        <input type="date" {...register('dateOfBirth')} placeholder="Date of birth" />
        <div data-testid="error-dateOfBirth">{errors.dateOfBirth?.message}</div>
        <input {...register('address.country')} placeholder="Country" />
        <div data-testid="error-country">{errors.address?.country?.message}</div>
        <input {...register('address.city')} placeholder="City" />
        <div data-testid="error-city">{errors.address?.city?.message}</div>
        <input {...register('address.street')} placeholder="Street" />
        <div data-testid="error-street">{errors.address?.street?.message}</div>
        <input {...register('address.postalCode')} placeholder="Postal code" />
        <div data-testid="error-postalCode">{errors.address?.postalCode?.message}</div>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
