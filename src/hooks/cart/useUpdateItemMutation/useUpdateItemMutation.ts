import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@services/api/commercetools/hooks';
import QueryKeys from '@utils/consts/QueryKeys';
import { toast } from 'react-toastify';
import UpdateItemMutationArguments from './types/UpdateItemMutationArguments';

function useUpdateItemMutation() {
  const api = useApi();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      action,
      cartId,
      variantId,
      productId,
      lineItemId,
      quantity,
      cartVersion,
    }: UpdateItemMutationArguments) =>
      api({ needAnonymousAuth: true })
        .me()
        .carts()
        .withId({
          ID: cartId,
        })
        .post({
          body: {
            version: cartVersion,
            actions: [{ action, productId, quantity, variantId, lineItemId }],
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

export default useUpdateItemMutation;
