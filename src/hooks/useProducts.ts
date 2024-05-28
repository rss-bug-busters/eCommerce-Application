import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import useApi from '@services/api/hooks/useApi';
import { useTranslation } from 'react-i18next';
import usePriceInfo from '@hooks/usePriceInfo.ts';

interface UseProductsOptions {
  limit?: number;
  offset?: number;
  search?: {
    query: string;
  };
  sort?: {
    field: string;
    needLocal?: boolean;
    order: 'asc' | 'desc';
  };
}

const useProducts = (options?: UseProductsOptions) => {
  const api = useApi();
  const { priceInfo } = usePriceInfo();
  const { i18n } = useTranslation();
  const { sort, search, offset = 0 } = options ?? {};

  return useQuery({
    queryFn: () =>
      api()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            offset,
            limit: 12,
            sort: sort
              ? `${sort.field}${sort.needLocal ? '.' : ''}${i18n.language ?? ''} ${sort.order}`
              : undefined,
            [`text.${i18n.language}`]: search?.query,
            priceCurrency: priceInfo.priceCurrency,
            priceCountry: priceInfo.priceCountry,
          },
        })
        .execute(),
    queryKey: [QueryKeys.CATALOG_PRODUCTS],
    retry: false,
  });
};

export default useProducts;
