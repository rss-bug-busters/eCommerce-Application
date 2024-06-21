import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import useApi from '@services/api/commercetools/hooks/useApi';
import { getErrorByCode } from '@commercetools/sdk-client-v2';
import usePriceInfo from '@hooks/usePriceInfo';

function useCart() {
  const api = useApi();
  const { priceInfo } = usePriceInfo();

  const createCart = async () =>
    api({ needAnonymousAuth: true })
      .me()
      .carts()
      .post({
        body: {
          currency: priceInfo.priceCurrency,
          country: priceInfo.priceCountry,
        },
      })
      .execute();

  return useQuery({
    queryFn: () =>
      api({ needAnonymousAuth: true })
        .me()
        .activeCart()
        .get()
        .execute()
        .catch((error) => {
          if (error instanceof getErrorByCode(404)) {
            return createCart();
          }

          throw error;
        })
        .then(async (data) => {
          if (
            data.body.country !== priceInfo.priceCountry ||
            data.body.totalPrice.currencyCode !== priceInfo.priceCurrency
          ) {
            const existCarts = await api({ needAnonymousAuth: true })
              .me()
              .carts()
              .get({
                queryArgs: {
                  where: `country="${priceInfo.priceCountry}" and totalPrice(currencyCode="${priceInfo.priceCurrency}") and cartState="Active" and totalPrice(centAmount > 0)`,
                },
              })
              .execute();

            const newCart = existCarts.body.results?.[0];

            if (newCart) {
              const oldCart = data;

              oldCart.body = newCart;

              return oldCart;
            }

            return createCart();
          }

          return data;
        }),
    queryKey: [QueryKeys.CART],
    refetchOnMount: false,
  });
}

export default useCart;
