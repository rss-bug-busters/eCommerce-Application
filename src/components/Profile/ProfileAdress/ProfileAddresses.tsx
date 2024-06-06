import { Address, Customer } from '@commercetools/platform-sdk';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import CheckBox from '@components/ui/CheckBox/CheckBox';
import AddressFieldsProfile from './InputAddress/inputAddressField';
import { ProfileEditType } from '../ProfileForm/ProfileEdit.type';

interface ProfileAddressProperties {
  addresses: Address[];
  errors: FieldErrors;
  isEdit: boolean;
  register: UseFormRegister<ProfileEditType>;
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  setValue: UseFormSetValue<ProfileEditType>;
  userData: Customer | undefined;
}

interface ZodAddress {
  city: string;
  country: 'PL' | 'BY' | 'RU';
  id: string;
<<<<<<< test/profile-page
  key: string;
=======
>>>>>>> release/catalog-product-profile
  postalCode: string;
  streetName: string;
}

const ProfileAddress: FC<ProfileAddressProperties> = function ({
  userData,
  errors,
  register,
  isEdit = false,
  setValue,
  addresses,
  setAddresses,
}) {
  const [selectedShippingCheckbox, setSelectedShippingCheckbox] = useState<string>('');
  const [selectedBillingCheckbox, setSelectedBillingCheckbox] = useState<string>('');
  // const [addresses, setAddresses] = useState(userData?.addresses);
  const [useDeleteAddresses, setDeleteAddresses] = useState<number[]>([]);
  const [useCountDeleted, setCountDeleted] = useState(0);

  // useEffect(() => {
  //   setAddresses(
  //     userData?.addresses.filter((_, index) => !useDeleteAddresses.includes(index))
  //   );
  // }, [setAddresses, useDeleteAddresses, userData?.addresses, userData?.addresses.length]);

  useEffect(() => {
    setValue('Address', addresses as ZodAddress[]);
  }, [addresses, setValue]);

  useEffect(() => {
    setSelectedShippingCheckbox(userData?.defaultShippingAddressId ?? '');
    setSelectedBillingCheckbox(userData?.defaultBillingAddressId ?? '');
  }, [userData?.defaultShippingAddressId, userData?.defaultBillingAddressId]);

  const handleShippingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

<<<<<<< test/profile-page
    setSelectedShippingCheckbox(value);
=======
    setSelectedShippingCheckbox(selectedShippingCheckbox === value ? '' : value);
>>>>>>> release/catalog-product-profile
  };

  useEffect(() => {
    if (!selectedShippingCheckbox) {
      setValue('isDefaultShipping', '');
    }
  }, [selectedShippingCheckbox, setValue]);

  const handleBillingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

<<<<<<< test/profile-page
    setSelectedBillingCheckbox(value);
=======
    setSelectedBillingCheckbox(selectedBillingCheckbox === value ? '' : value);
>>>>>>> release/catalog-product-profile
  };

  useEffect(() => {
    if (!selectedBillingCheckbox) {
      setValue('isDefaultBilling', '');
    }
  }, [selectedBillingCheckbox, setValue]);

  const handleDelete = (index: number) => {
    if (!addresses) {
      return;
    }

    setDeleteAddresses([...useDeleteAddresses, index + useCountDeleted]);
    setCountDeleted(useCountDeleted + 1);

    const updatedAddresses = addresses.filter((_, index_) => index_ !== index);

    setAddresses(updatedAddresses);
  };
  // console.log(addresses)

  return (
    <div className="flex flex-col items-center gap-3">
      {addresses &&
        addresses.length > 0 &&
        addresses.map((address, index) => (
          <div
            key={`address-${Math.random().toString(36).slice(2, 9)}`}
            className="m-auto flex max-w-xl flex-col items-center rounded-xl border border-gray-200 p-5 md:gap-6 dark:bg-zinc-800"
          >
            <div className="flex w-full flex-row justify-start gap-0">
              <CheckBox
<<<<<<< test/profile-page
                value={address.id ?? address.key ?? ''}
                label="Default Shipping"
                checked={selectedShippingCheckbox === (address.id ?? address.key)}
=======
                value={address.id ?? ''}
                label="Default Shipping"
                checked={selectedShippingCheckbox === address.id}
>>>>>>> release/catalog-product-profile
                isEdit={isEdit}
                onChange={handleShippingCheckboxChange}
                name="isDefaultShipping"
                setValue={setValue}
                register={register}
              />
              <CheckBox
<<<<<<< test/profile-page
                value={address.id ?? address.key ?? ''}
                label="Default Billing"
                checked={selectedBillingCheckbox === (address.id ?? address.key)}
=======
                value={address.id ?? ''}
                label="Default Billing"
                checked={selectedBillingCheckbox === address.id}
>>>>>>> release/catalog-product-profile
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
                className="flex items-end  rounded-md bg-red-800 px-4 py-2 text-center font-semibold text-white hover:bg-red-600 dark:bg-zinc-600 dark:hover:bg-zinc-50"
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
