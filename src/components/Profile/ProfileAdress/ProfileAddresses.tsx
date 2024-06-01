import { Customer } from '@commercetools/platform-sdk';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';
import CheckBox from '@components/ui/CheckBox/CheckBox';
import AddressFieldsProfile from './InputAddress/inputAddressField';

interface ProfileAddressProperties {
  errors: FieldErrors;
  isEdit: boolean;
  register: UseFormRegister<SignUpFormType>;
  userData: Customer | undefined;
}

const ProfileAddress: FC<ProfileAddressProperties> = function ({
  userData,
  errors,
  register,
  isEdit = false,
}) {
  const [selectedShippingCheckbox, setSelectedShippingCheckbox] = useState<string>('');
  const [selectedBillingCheckbox, setSelectedBillingCheckbox] = useState<string>('');

  useEffect(() => {
    setSelectedShippingCheckbox(userData?.defaultShippingAddressId ?? '');
    setSelectedBillingCheckbox(userData?.defaultBillingAddressId ?? '');
  }, [userData?.defaultShippingAddressId, userData?.defaultBillingAddressId]);

  const handleShippingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedShippingCheckbox(selectedShippingCheckbox === value ? '' : value);
  };

  const handleBillingCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedBillingCheckbox(selectedBillingCheckbox === value ? '' : value);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {userData?.addresses &&
        userData.addresses.length > 0 &&
        userData.addresses.map((address) => (
          <div
            key={address.id}
            className="flex flex-col p-5 items-center md:gap-6 max-w-xl dark:bg-zinc-800 border border-gray-200 rounded-xl m-auto"
          >
            <div className="flex flex-row justify-start gap-0 w-full">
              <CheckBox
                value={address.id}
                label="Default Shipping"
                checked={selectedShippingCheckbox === address.id}
                isEdit={isEdit}
                onChange={handleShippingCheckboxChange}
              />
              <CheckBox
                value={address.id}
                label="Default Billing"
                checked={selectedBillingCheckbox === address.id}
                isEdit={isEdit}
                onChange={handleBillingCheckboxChange}
              />
            </div>
            <AddressFieldsProfile
              errors={errors}
              register={register}
              prefix={
                address.key === 'shipping-address' ? 'shippingAddress' : 'billingAddress'
              }
              address={address}
              isEdit={isEdit}
            />
            {isEdit && (
              <button
                type="button"
                className="flex items-end bg-red-500 text-white px-4 py-2 rounded-md"
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
