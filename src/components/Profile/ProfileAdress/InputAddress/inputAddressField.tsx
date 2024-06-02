import React, { useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import SelectProfile from '@components/ui/Select/selectProfile';
import { Address } from '@commercetools/platform-sdk';
import { ProfileEditType } from '@components/Profile/ProfileForm/ProfileEdit.type';
import InputFieldProfile from '../../../ui/InputField/InputFieldProfile';

interface AddressFieldsProperties {
  address: Address;
  errors: FieldErrors<ProfileEditType>;
  index: number;
  isEdit: boolean;
  register: UseFormRegister<ProfileEditType>;
  setValue: UseFormSetValue<ProfileEditType>;
}

const countryOptions = [
  { value: 'PL', label: 'Poland' },
  { value: 'BY', label: 'Belarus' },
  { value: 'RU', label: 'Russia' },
];

const AddressFieldsProfile: React.FC<AddressFieldsProperties> = function ({
  register,
  errors,
  address,
  isEdit = false,
  setValue,
  index,
}) {
  useEffect(() => {
    if (address.id) {
      setValue(`Address.${index}.id`, address.id);
    } else {
      setValue(`Address.${index}.id`, `newAddress-${index}`);
    }
  }, [index, address.id, setValue]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
      // key={`${address.id}addressField`}
    >
      <SelectProfile
        name={`Address.${index}.country` as keyof ProfileEditType}
        options={countryOptions}
        register={register(`Address.${index}.country`)}
        placeholder="Country"
        error={errors.Address?.[index]?.country}
        defaultValue={address.country}
        isEdit={isEdit}
        setValue={setValue}
        // key={`${address.id}${address.country}`}
      />
      <InputFieldProfile
        name={`Address.${index}.city` as keyof ProfileEditType}
        register={register(`Address.${index}.city`)}
        placeholder="City"
        error={errors.Address?.[index]?.city}
        defaultValue={address.city}
        isEdit={isEdit}
        setValue={setValue}
        // key={`${address.id}${address.city}`}
      />
      <InputFieldProfile
        name={`Address.${index}.streetName` as keyof ProfileEditType}
        register={register(`Address.${index}.streetName`)}
        placeholder="Street"
        error={errors.Address?.[index]?.streetName}
        defaultValue={address.streetName}
        isEdit={isEdit}
        setValue={setValue}
        // key={`${address.id}${address.streetName}`}
      />
      <InputFieldProfile
        name={`Address.${index}.postalCode` as keyof ProfileEditType}
        register={register(`Address.${index}.postalCode`)}
        placeholder="Postal code"
        error={errors.Address?.[index]?.postalCode}
        defaultValue={address.postalCode}
        isEdit={isEdit}
        setValue={setValue}

        // key={`${address.id}${address.postalCode}`}
      />
    </div>
  );
};

export default AddressFieldsProfile;
