import { Customer } from '@commercetools/platform-sdk';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import CheckBox from '@components/ui/CheckBox/CheckBox';
import AddressFieldsProfile from './InputAddress/inputAddressField';
import { ProfileEditType } from '../ProfileForm/ProfileEdit.type';

interface ProfileAddressProperties {
  errors: FieldErrors;
  isEdit: boolean;
  register: UseFormRegister<ProfileEditType>;
  setValue: UseFormSetValue<ProfileEditType>;
  userData: Customer | undefined;
}

interface ZodAddress {
  city: string;
  country: 'PL' | 'BY' | 'RU';
  id: string;
  postalCode: string;
  streetName: string;
}

const ProfileAddress: FC<ProfileAddressProperties> = function ({
  userData,
  errors,
  register,
  isEdit = false,
  setValue,
}) {
  const [selectedShippingCheckbox, setSelectedShippingCheckbox] = useState<string>('');
  const [selectedBillingCheckbox, setSelectedBillingCheckbox] = useState<string>('');
  const [addresses, setAddresses] = useState(userData?.addresses);
  const [useDeleteAddresses, setDeleteAddresses] = useState<number[]>([]);
  const [useCountDeleted, setCountDeleted] = useState(0);

  useEffect(() => {
    setAddresses(
      userData?.addresses.filter((_, index) => !useDeleteAddresses.includes(index))
    );
  }, [setAddresses, useDeleteAddresses, userData?.addresses, userData?.addresses.length]);

  useEffect(() => {
    setValue('Address', addresses as ZodAddress[]);
  }, [addresses, setValue]);

  useEffect(() => {
    setSelectedShippingCheckbox(userData?.defaultShippingAddressId ?? '');
    setSelectedBillingCheckbox(userData?.defaultBillingAddressId ?? '');
  }, [userData?.defaultShippingAddressId, userData?.defaultBillingAddressId]);

  const handleShippingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedShippingCheckbox(selectedShippingCheckbox === value ? '' : value);
  };

  useEffect(() => {
    if (!selectedShippingCheckbox) {
      setValue('isDefaultShipping', '');
    }
  }, [selectedShippingCheckbox, setValue]);

  const handleBillingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedBillingCheckbox(selectedBillingCheckbox === value ? '' : value);
  };

  useEffect(() => {
    if (!selectedBillingCheckbox) {
      setValue('isDefaultBilling', '');
    }
  }, [selectedBillingCheckbox, setValue]);

  const handleDelete = (index: number) => {
    console.log(useDeleteAddresses);

    if (!addresses) {
      return;
    }

    setDeleteAddresses([...useDeleteAddresses, index + useCountDeleted]);
    setCountDeleted(useCountDeleted + 1);

    const updatedAddresses = addresses.filter((_, index_) => index_ !== index);

    setAddresses(updatedAddresses);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {addresses &&
        addresses.length > 0 &&
        addresses.map((address, index) => (
          <div
            key={`address-${Math.random().toString(36).slice(2, 9)}`}
            className="flex flex-col p-5 items-center md:gap-6 max-w-xl dark:bg-zinc-800 border border-gray-200 rounded-xl m-auto"
          >
            <div className="flex flex-row justify-start gap-0 w-full">
              <CheckBox
                value={address.id ?? ''}
                label="Default Shipping"
                checked={selectedShippingCheckbox === address.id}
                isEdit={isEdit}
                onChange={handleShippingCheckboxChange}
                name="isDefaultShipping"
                setValue={setValue}
                register={register}
              />
              <CheckBox
                value={address.id ?? ''}
                label="Default Billing"
                checked={selectedBillingCheckbox === address.id}
                isEdit={isEdit}
                onChange={handleBillingCheckboxChange}
                name="isDefaultBilling"
                setValue={setValue}
                register={register}
              />
            </div>
            <AddressFieldsProfile
              errors={errors}
              register={register}
              address={address}
              isEdit={isEdit}
              setValue={setValue}
              index={index}
            />
            {isEdit && (
              <button
                type="button"
                className="flex items-end bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProfileAddress;
