import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import AddressFields from '@components/AddressFields/AddressFields';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import Spinner from '@assets/svg/spinner.svg?react';
import { toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';
import useSignUpMutation from '@hooks/user/useSignUpMutation';
import { SignUpFormSchema, SignUpFormType } from './SignUpForm.types';

const SignUpForm: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const client = useQueryClient();
  const navigate = useNavigate();
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(true);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(true);
  const shipping = useWatch({
    control,
    name: 'shippingAddress',
  });

  const handleUseSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(event.target.checked);

    if (event.target.checked) {
      setValue('billingAddress', shipping);
      setValue('isDefaultBilling', useAsDefaultShipping);
    }
  };
  const handleSetDefault = () => {
    if (useSameAddress) {
      setUseAsDefaultBilling(!useAsDefaultShipping);
    }

    setUseAsDefaultShipping(!useAsDefaultShipping);
  };

  const { mutate: signUpMutation, isPending } = useSignUpMutation();

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    toast.dismiss();
    signUpMutation(data, {
      async onSuccess() {
        toast.success('Account created successfully!');
        await client.resetQueries();
        navigate(RoutePaths.MAIN);
      },
      onError(error) {
        toast.error(`Failed: ${error.message}`);
      },
    });
  };

  useEffect(() => {
    if (useSameAddress) {
      setValue('billingAddress', shipping);
    }
  }, [setValue, shipping, useSameAddress]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex max-w-xl flex-col items-center gap-3 rounded-xl border border-gray-200 p-5 md:gap-6 dark:bg-zinc-800"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
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
          type="text"
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
      <div className="flex items-center gap-x-2">
        <h2 className=" text-center text-xl dark:text-white">Shipping Address</h2>
        <label htmlFor="isDefaultShipping" className="flex cursor-pointer items-center">
          (
          <input
            {...register('isDefaultShipping')}
            className="h-3 w-3 accent-orange-400"
            id="isDefaultShipping"
            type="checkbox"
            checked={useAsDefaultShipping}
            onChange={handleSetDefault}
          />
          <span className="ml-2 text-xs text-orange-900 dark:text-amber-500/80">
            Set as default address
          </span>
          )
        </label>
      </div>
      <div className="flex flex-col items-center">
        <AddressFields errors={errors} register={register} prefix="shippingAddress" />
        <label htmlFor="useSameAddress" className="mt-4 flex cursor-pointer items-center">
          <input
            {...register('useSameAddress')}
            className="h-4 w-4 accent-green-700"
            id="useSameAddress"
            type="checkbox"
            checked={useSameAddress}
            onChange={handleUseSameAddressChange}
          />
          <span className="ml-2 text-lg font-semibold text-orange-900 dark:text-amber-500/80">
            Use same address for billing
          </span>
        </label>
      </div>
      {!useSameAddress && (
        <>
          <div className="flex items-center gap-x-2">
            <h2 className=" text-center text-xl dark:text-white">Billing Address</h2>
            <label
              htmlFor="isDefaultBilling"
              className="flex cursor-pointer items-center"
            >
              (
              <input
                {...register('isDefaultBilling')}
                className="h-3 w-3 accent-orange-400"
                id="isDefaultBilling"
                type="checkbox"
                checked={useAsDefaultBilling}
                onChange={() => setUseAsDefaultBilling(!useAsDefaultBilling)}
              />
              <span className="ml-2 text-xs text-orange-900 dark:text-amber-500/80">
                Set as default address
              </span>
              )
            </label>
          </div>
          <AddressFields errors={errors} register={register} prefix="billingAddress" />
        </>
      )}
      <button
        type="submit"
        className="mt-4 flex min-w-72 items-center justify-center rounded-full bg-gray-800 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-500"
      >
        {isPending && <Spinner className="mr-4 h-6 w-6 animate-spin" />}
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
