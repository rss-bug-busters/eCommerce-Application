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

const manageAddresses = (
  userData: Customer,
  submitData: ProfileEditType,
  changes: MyCustomerUpdateAction[]
) => {
  for (const data of userData.addresses) {
    const isAddressExist = submitData.Address.filter((address) => data.id === address.id);

    if (isAddressExist.length > 0) {
      const changedDataAddress = checkAddress(data, isAddressExist[0]);

      if (changedDataAddress) {
        changes.push(changedDataAddress);
      }
    } else if (data.id) {
      changes.push({ action: 'removeAddress', addressId: data.id });
    }
  }

  const newAddresses = submitData.Address.filter((address) =>
    address.id.includes('newAddress')
  );

  if (newAddresses) {
    for (const data of newAddresses) {
      const addressToAdd = {
        country: data.country,
        city: data.city,
        streetName: data.streetName,
        postalCode: data.postalCode,
<<<<<<< test/profile-page
        key: data.id,
=======
>>>>>>> release/catalog-product-profile
      };

      changes.push({ action: 'addAddress', address: addressToAdd });
    }
  }
};

const checkChangesProfile = (userData: Customer, submitData: ProfileEditType) => {
  const changes: MyCustomerUpdateAction[] = [];
<<<<<<< test/profile-page
  const defualtChanges: MyCustomerUpdateAction[] = [];
=======
>>>>>>> release/catalog-product-profile

  if (userData.email !== submitData.email) {
    changes.push({ action: 'changeEmail', email: submitData.email });
  }

  if (userData.firstName !== submitData.name) {
    changes.push({ action: 'setFirstName', firstName: submitData.name });
  }

  if (userData.lastName !== submitData.surname) {
    changes.push({ action: 'setLastName', lastName: submitData.surname });
  }

  if (userData.dateOfBirth !== submitData.dateOfBirth) {
    changes.push({ action: 'setDateOfBirth', dateOfBirth: submitData.dateOfBirth });
  }

  manageAddresses(userData, submitData, changes);

  if (
    userData.defaultBillingAddressId !== submitData.isDefaultBilling &&
    submitData.isDefaultBilling
  ) {
<<<<<<< test/profile-page
    if (submitData.isDefaultBilling.includes('newAddress')) {
      defualtChanges.push({
        action: 'setDefaultBillingAddress',
        addressKey: submitData.isDefaultBilling,
      });
    } else {
      defualtChanges.push({
        action: 'setDefaultBillingAddress',
        addressId: submitData.isDefaultBilling,
      });
    }
  }

  if (userData.defaultShippingAddressId !== submitData.isDefaultShipping) {
    if (submitData.isDefaultBilling.includes('newAddress')) {
      defualtChanges.push({
        action: 'setDefaultShippingAddress',
        addressKey: submitData.isDefaultShipping,
      });
    } else {
      defualtChanges.push({
        action: 'setDefaultShippingAddress',
        addressId: submitData.isDefaultShipping,
      });
    }
  }

  return [changes, defualtChanges];
=======
    changes.push({
      action: 'setDefaultBillingAddress',
      addressId: submitData.isDefaultBilling,
    });
  }

  if (
    userData.defaultShippingAddressId !== submitData.isDefaultShipping &&
    submitData.isDefaultShipping
  ) {
    changes.push({
      action: 'setDefaultShippingAddress',
      addressId: submitData.isDefaultShipping,
    });
  }

  return changes;
>>>>>>> release/catalog-product-profile
};

export default checkChangesProfile;
