import { useApi } from '@services/api/commercetools/hooks';
import QueryKeys from '@utils/consts/QueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RemoveItemMutationArguments from '@hooks/cart/useRemoveItemMutation/types/RemoveItemMutationArguments';
import { toast } from 'react-toastify';

function useRemoveItemMutation() {
  const api = useApi();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lineItemId, cartVersion }: RemoveItemMutationArguments) =>
      api({ needAnonymousAuth: true })
        .me()
        .carts()
        .withId({
          ID: cartId,
        })
        .post({
          body: {
            version: cartVersion,
            actions: [{ action: 'removeLineItem', lineItemId }],
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

export default useRemoveItemMutation;
