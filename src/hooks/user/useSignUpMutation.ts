import { useMutation } from '@tanstack/react-query';
import { SignUpFormType } from '@components/Auth/SignUp/SignUpForm/SignUpForm.types';
import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import { useUserQueries } from '@services/api/commercetools/hooks';

const useSignUpMutation = () => {
  const { register, addShippingAddress, addBillingAddress } = useUserQueries();

  return useMutation({
    mutationFn: async (data: SignUpFormType) => {
      const {
        name,
        surname,
        dateOfBirth,
        email,
        password,
        shippingAddress,
        billingAddress,
        useSameAddress,
        isDefaultShipping,
        isDefaultBilling,
      } = data;

      const newShipping: BaseAddress = {
        key: 'shipping-address',
        ...shippingAddress,
      };
      const newBilling: BaseAddress = {
        key: 'billing-address',
        ...billingAddress,
      };

      const newUser: MyCustomerDraft = {
        email,
        password,
        firstName: name,
        lastName: surname,
        dateOfBirth,
        addresses: useSameAddress ? [newShipping] : [newShipping, newBilling],
        ...(isDefaultShipping ? { defaultShippingAddress: 0 } : {}),
        ...(isDefaultBilling ? { defaultBillingAddress: useSameAddress ? 0 : 1 } : {}),
      };

      const userResp = await register(newUser);

      if (newShipping.key) {
        const { body } = await addShippingAddress(newShipping.key, userResp.body.version);

        if (newBilling.key) {
          await addBillingAddress(
            useSameAddress ? newShipping.key : newBilling.key,
            body.version
          );
        }
      }

      return userResp;
    },
  });
};

export default useSignUpMutation;
