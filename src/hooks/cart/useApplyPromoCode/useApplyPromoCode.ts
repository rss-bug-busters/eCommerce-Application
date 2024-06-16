import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@services/api/commercetools/hooks';
import QueryKeys from '@utils/consts/QueryKeys';
import { toast } from 'react-toastify';
import ApplyPromoCodeArguments from './types/ApplyPromoCodeArguments';

function useApplyPromoCode() {
  const api = useApi();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ action, cartId, cartVersion, code }: ApplyPromoCodeArguments) =>
      api({ needAnonymousAuth: true })
        .me()
        .carts()
        .withId({
          ID: cartId,
        })
        .post({
          body: {
            version: cartVersion,
            actions: [{ action, code }],
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

export default useApplyPromoCode;
