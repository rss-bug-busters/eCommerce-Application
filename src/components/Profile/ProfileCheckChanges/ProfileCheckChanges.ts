import {
  Address,
  Customer,
  MyCustomerChangeAddressAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { ProfileEditType } from '../ProfileForm/ProfileEdit.type';

const checkAddress = (
  userDataAddress: Address,
  submitDataAddress: Address | undefined
) => {
  let isChangedAddress = false;

  if (submitDataAddress && userDataAddress.country !== submitDataAddress.country) {
    isChangedAddress = true;
  }

  if (submitDataAddress && userDataAddress.city !== submitDataAddress.city) {
    isChangedAddress = true;
  }

  if (submitDataAddress && userDataAddress.streetName !== submitDataAddress.streetName) {
    isChangedAddress = true;
  }

  if (submitDataAddress && userDataAddress.postalCode !== submitDataAddress.postalCode) {
    isChangedAddress = true;
  }

  if (!isChangedAddress) {
    return false;
  }

  if (!submitDataAddress) {
    return false;
  }

  const changeAddress: MyCustomerChangeAddressAction = {
    action: 'changeAddress',
    addressId: userDataAddress.id,
    address: submitDataAddress,
  };

  return changeAddress;
};

const checkChangesProfile = (userData: Customer, submitData: ProfileEditType) => {
  const changes: MyCustomerUpdateAction[] = [];

  if (userData.firstName !== submitData.name) {
    changes.push({ action: 'setFirstName', firstName: submitData.name });
  }

  if (userData.lastName !== submitData.surname) {
    changes.push({ action: 'setLastName', lastName: submitData.surname });
  }

  if (userData.dateOfBirth !== submitData.dateOfBirth) {
    changes.push({ action: 'setDateOfBirth', dateOfBirth: submitData.dateOfBirth });
  }

  for (const [index, data] of userData.addresses.entries()) {
    if (submitData.Address[index]) {
      const changedDataAddress = checkAddress(data, submitData.Address[index]);

      if (changedDataAddress) {
        changes.push(changedDataAddress);
      }
    }
  }

  if (userData.defaultBillingAddressId !== submitData.isDefaultBilling) {
    changes.push({
      action: 'setDefaultBillingAddress',
      addressId: submitData.isDefaultBilling,
    });
  }

  if (userData.defaultShippingAddressId !== submitData.isDefaultShipping) {
    changes.push({
      action: 'setDefaultShippingAddress',
      addressId: submitData.isDefaultShipping,
    });
  }

  return changes;
};

export default checkChangesProfile;
