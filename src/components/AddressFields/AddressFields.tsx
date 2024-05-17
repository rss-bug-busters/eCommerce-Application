import React from 'react';
import InputField from '@components/ui/InputField/InputField';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';
import Select from '@components/ui/Select/Select';

interface AddressFieldsProperties {
  errors: FieldErrors<SignUpFormType>;
  register: UseFormRegister<SignUpFormType>;
}

const countryOptions = [
  { value: 'PLN', label: 'Poland' },
  { value: 'BLR', label: 'Belarus' },
  { value: 'RUS', label: 'Russia' },
];

const AddressFields: React.FC<AddressFieldsProperties> = function ({ register, errors }) {
  return (
    <div className="flex flex-wrap gap-8">
      <Select
        name="address.country"
        options={countryOptions}
        register={register('address.country')}
        placeholder="Select Country"
        error={errors.address?.country}
      />
      <InputField
        name="address.city"
        register={register('address.city')}
        placeholder="City"
        error={errors.address?.city}
      />
      <InputField
        name="address.street"
        register={register('address.street')}
        placeholder="Street"
        error={errors.address?.street}
      />
      <InputField
        name="address.postalCode"
        register={register('address.postalCode')}
        placeholder="Postal code"
        error={errors.address?.postalCode}
      />
    </div>
  );
};

export default AddressFields;
