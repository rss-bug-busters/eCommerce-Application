import React from 'react';
import InputField from '@components/ui/InputField/InputField';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';

interface AddressFieldsProperties {
  errors: FieldErrors<SignUpFormType>;
  register: UseFormRegister<SignUpFormType>;
}

const AddressFields: React.FC<AddressFieldsProperties> = function ({ register, errors }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      <InputField
        name="address.country"
        register={register('address.country')}
        placeholder="Country"
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
