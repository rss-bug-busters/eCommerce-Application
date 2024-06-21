import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@services/api/commercetools/hooks';
import QueryKeys from '@utils/consts/QueryKeys';
import { toast } from 'react-toastify';
import AddItemMutationArguments from './types/AddItemMutationArguments';

function useAddItemMutation() {
  const api = useApi();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      variantId,
      productId,
      quantity,
      cartVersion,
    }: AddItemMutationArguments) =>
      api({ needAnonymousAuth: true })
        .me()
        .carts()
        .withId({
          ID: cartId,
        })
        .post({
          body: {
            version: cartVersion,
            actions: [{ action: 'addLineItem', productId, quantity, variantId }],
          },
        })
        .execute(),
    onSuccess: (data) => {
      client.setQueryData([QueryKeys.CART], () => data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useAddItemMutation;
