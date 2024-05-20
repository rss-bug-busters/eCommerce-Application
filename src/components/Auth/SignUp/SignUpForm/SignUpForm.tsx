import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import InputField from '@components/ui/InputField/InputField';
import AddressFields from '@components/AddressFields/AddressFields';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import Spinner from '@assets/svg/spinner.svg?react';
import { toast } from 'react-toastify';
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
  const {
    register: signUp,
    login,
    addShippingAddress,
    addBillingAddress,
  } = useUserQueries();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    const {
      name,
      surname,
      dateOfBirth,
      email,
      password,
      shippingAddress,
      billingAddress,
    } = data;

    const newShipping: BaseAddress = {
      key: 'shipping-address',
      ...shippingAddress,
    };
    const newBilling: BaseAddress = {
      key: 'billing-address',
      ...billingAddress,
    };

    const newUser: MyCustomerDraft = {
      email,
      password,
      firstName: name,
      lastName: surname,
      dateOfBirth,
      addresses: useSameAddress ? [newShipping] : [newShipping, newBilling],
      ...(useAsDefaultShipping ? { defaultShippingAddress: 0 } : {}),
      ...(useAsDefaultBilling ? { defaultBillingAddress: useSameAddress ? 0 : 1 } : {}),
    };

    try {
      setIsLoading(true);
      const prom = async () => signUp(newUser);

      const userResp = await toast.promise(prom, {
        pending: 'Creating account...',
        success: 'Account created successfully!',
        error: 'Failed to create account',
      });

      await login(email, password);

      if (newShipping.key) {
        const { body } = await addShippingAddress(newShipping.key, userResp.body.version);

        if (newBilling.key) {
          await addBillingAddress(
            useSameAddress ? newShipping.key : newBilling.key,
            body.version
          );
        }
      }

      navigate(RoutePaths.MAIN);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // setValue('billingAddress', shipping);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 max-w-xl border border-gray-200 rounded-xl p-2 m-auto"
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
      <div className="flex items-center gap-x-2">
        <h2 className=" text-xl text-center -mb-4">Shipping Address</h2>
        <label
          htmlFor="isDefaultShipping"
          className="flex items-center mt-4 cursor-pointer"
        >
          (
          <input
            {...register('isDefaultShipping')}
            className="w-3 h-3 accent-orange-400"
            id="isDefaultShipping"
            type="checkbox"
            checked={useAsDefaultShipping}
            onChange={handleSetDefault}
          />
          <span className="ml-2 text-orange-900 text-xs">Set as default address</span>)
        </label>
      </div>
      <div className="flex flex-col items-center">
        <AddressFields errors={errors} register={register} prefix="shippingAddress" />
        <label htmlFor="useSameAddress" className="flex items-center mt-4 cursor-pointer">
          <input
            {...register('useSameAddress')}
            className="w-4 h-4 accent-green-700"
            id="useSameAddress"
            type="checkbox"
            checked={useSameAddress}
            onChange={handleUseSameAddressChange}
          />
          <span className="ml-2 text-orange-900 text-lg font-semibold">
            Use same address for billing
          </span>
        </label>
      </div>
      {!useSameAddress && (
        <>
          <div className="flex items-center gap-x-2">
            <h2 className=" text-xl text-center -mb-4">Billing Address</h2>
            <label
              htmlFor="isDefaultBilling"
              className="flex items-center mt-4 cursor-pointer"
            >
              (
              <input
                {...register('isDefaultBilling')}
                className="w-3 h-3 accent-orange-400"
                id="isDefaultBilling"
                type="checkbox"
                checked={useAsDefaultBilling}
                onChange={() => setUseAsDefaultBilling(!useAsDefaultBilling)}
              />
              <span className="ml-2 text-orange-900 text-xs">Set as default address</span>
              )
            </label>
          </div>
          <AddressFields errors={errors} register={register} prefix="billingAddress" />
        </>
      )}
      <button
        type="submit"
        className="flex items-center justify-center min-w-72 px-6 py-4 bg-gray-800 rounded-full font-semibold text-center text-white"
      >
        {isLoading && <Spinner className="w-6 h-6 mr-4 animate-spin" />}
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
