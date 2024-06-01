import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';
import SelectProfile from '@components/ui/Select/selectProfile';
import { Address } from '@commercetools/platform-sdk';
import InputFieldProfile from '../../../ui/InputField/InputFieldProfile';

interface AddressFieldsProperties {
  address: Address;
  errors: FieldErrors<SignUpFormType>;
  isEdit: boolean;
  prefix: 'billingAddress' | 'shippingAddress';
  register: UseFormRegister<SignUpFormType>;
}

const countryOptions = [
  { value: 'PL', label: 'Poland' },
  { value: 'BY', label: 'Belarus' },
  { value: 'RU', label: 'Russia' },
];

const AddressFieldsProfile: React.FC<AddressFieldsProperties> = function ({
  register,
  errors,
  prefix,
  address,
  isEdit = false,
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
      // key={`${address.id}addressField`}
    >
      <SelectProfile
        name={`${prefix}.country`}
        options={countryOptions}
        register={register(`${prefix}.country`)}
        placeholder="Country"
        error={errors[`${prefix}`]?.country}
        defaultValue={address.country}
        isEdit={isEdit}

        // key={`${address.id}${address.country}`}
      />
      <InputFieldProfile
        name={`${prefix}.city`}
        register={register(`${prefix}.city`)}
        placeholder="City"
        error={errors[`${prefix}`]?.city}
        defaultValue={address.city}
        isEdit={isEdit}
        // key={`${address.id}${address.city}`}
      />
      <InputFieldProfile
        name={`${prefix}.streetName`}
        register={register(`${prefix}.streetName`)}
        placeholder="Street"
        error={errors[`${prefix}`]?.streetName}
        defaultValue={address.streetName}
        isEdit={isEdit}
        // key={`${address.id}${address.streetName}`}
      />
      <InputFieldProfile
        name={`${prefix}.postalCode`}
        register={register(`${prefix}.postalCode`)}
        placeholder="Postal code"
        error={errors[`${prefix}`]?.postalCode}
        defaultValue={address.postalCode}
        isEdit={isEdit}
        // key={`${address.id}${address.postalCode}`}
      />
    </div>
  );
};

export default AddressFieldsProfile;
