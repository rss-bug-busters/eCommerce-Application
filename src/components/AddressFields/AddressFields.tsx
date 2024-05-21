import React from 'react';
import InputField from '@components/ui/InputField/InputField';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';
import Select from '@components/ui/Select/Select';

interface AddressFieldsProperties {
  errors: FieldErrors<SignUpFormType>;
  prefix: 'billingAddress' | 'shippingAddress';
  register: UseFormRegister<SignUpFormType>;
}

const countryOptions = [
  { value: 'PL', label: 'Poland' },
  { value: 'BY', label: 'Belarus' },
  { value: 'RU', label: 'Russia' },
];

const AddressFields: React.FC<AddressFieldsProperties> = function ({
  register,
  errors,
  prefix,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
      <Select
        name={`${prefix}.country`}
        options={countryOptions}
        register={register(`${prefix}.country`)}
        placeholder="Select Country"
        error={errors[`${prefix}`]?.country}
      />
      <InputField
        name={`${prefix}.city`}
        register={register(`${prefix}.city`)}
        placeholder="City"
        error={errors[`${prefix}`]?.city}
      />
      <InputField
        name={`${prefix}.streetName`}
        register={register(`${prefix}.streetName`)}
        placeholder="Street"
        error={errors[`${prefix}`]?.streetName}
      />
      <InputField
        name={`${prefix}.postalCode`}
        register={register(`${prefix}.postalCode`)}
        placeholder="Postal code"
        error={errors[`${prefix}`]?.postalCode}
      />
    </div>
  );
};

export default AddressFields;
