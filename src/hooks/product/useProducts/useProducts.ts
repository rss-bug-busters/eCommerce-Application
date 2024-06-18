import { useInfiniteQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import { useApi } from '@services/api/commercetools/hooks';
import { useTranslation } from 'react-i18next';
import usePriceInfo from '@hooks/usePriceInfo.ts';
import {
  sortType,
  makeFilterFilters,
  makeFilterFacets,
} from '@hooks/product/useProducts/utils';
import { UseProductsOptions } from '@hooks/product/useProducts/types';
import filterAttributes from '@utils/consts/filterAtributes';

const useProducts = (options?: UseProductsOptions) => {
  const api = useApi();
  const { priceInfo } = usePriceInfo();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const {
    sort: sortName = 'idAsk',
    category,
    search,
    limit = 12,
    price,
    attributes,
  } = options ?? {};

  const sort = sortName && sortType[sortName] ? sortType[sortName] : undefined;
  const sortQuery = sort
    ? `${sort.field}${sort.needLocal ? '.' : ''}${sort.needLocal ? language : ''} ${sort.order}`
    : undefined;

  const filters: string[] = [
    ...makeFilterFilters({
      attributes: filterAttributes,
      language,
      attributesValue: attributes ?? {},
    }),
  ].filter((item) => item !== undefined);

  const filtersQuery: string[] = [
    'variants.prices:exists',
    `name.${language}:exists`,
    `description.${language}:exists`,

    category ? `categories.id: subtree("${category}")` : undefined,
    price?.min
      ? `variants.scopedPrice.currentValue.centAmount: range(${price?.min} to *)`
      : undefined,
    price?.max
      ? `variants.scopedPrice.currentValue.centAmount: range(* to ${price?.max})`
      : undefined,
    price?.onlyDiscounted ? 'variants.scopedPrice.discounted:exists' : undefined,
  ].filter((item) => item !== undefined) as string[];

  const facets = [...makeFilterFacets(filterAttributes, language)];

  return useInfiniteQuery({
    initialPageParam: 0,
    getNextPageParam: (lastPage): number | undefined => {
      const { offset: dataOffset, limit: dataLimit, count, total } = lastPage.body;

      if (count < dataLimit || total === dataOffset) {
        return undefined;
      }

      return dataOffset + dataLimit;
    },
    getPreviousPageParam: (firstPage): number | undefined => {
      const { offset: dataOffset, limit: dataLimit } = firstPage.body;

      return dataOffset - dataLimit < 0 ? undefined : dataOffset - dataLimit;
    },
    queryFn: ({ pageParam }: { pageParam: number }) =>
      api({
        needAnonymousAuth: true,
      })
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: facets,
            offset: pageParam,
            limit,
            expand: 'productType',
            filter: filters,
            'filter.query': filtersQuery,
            sort: sortQuery,
            [`text.${language}`]: search,
            fuzzy: true,
            priceCurrency: priceInfo.priceCurrency,
            priceCountry: priceInfo.priceCountry,
          },
        })
        .execute(),
    queryKey: [
      QueryKeys.CATALOG_PRODUCTS,
      `search:${search}`,
      `limit:${limit}`,
      `sort:${sortName}`,
      `category:${category}`,
      `minPrice:${price?.min}`,
      `maxPrice:${price?.max}`,
      `onlyDiscounted:${price?.onlyDiscounted}`,
      `attributes:${JSON.stringify(attributes)}`,
    ],
    retry: false,
    refetchOnMount: false,
  });
};

export default useProducts;
