import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import useApi from '@services/api/hooks/useApi';
import { useTranslation } from 'react-i18next';
import usePriceInfo from '@hooks/usePriceInfo';
import makeFilterFacets from '@utils/makeFilterFacets';
import filterAttributes from '@utils/consts/filterAtributes';
import makeFilterFilters from '@utils/makeFilterFilters';

interface Sort {
  field: string;
  needLocal: boolean;
  order: 'asc' | 'desc';
}

const SortType: Record<string, Sort> = {
  priceAsk: {
    field: 'price',
    needLocal: false,
    order: 'asc',
  },
  priceDesk: {
    field: 'price',
    needLocal: false,
    order: 'desc',
  },
  titleAsk: {
    field: 'name',
    needLocal: true,
    order: 'asc',
  },
  titleDesk: {
    field: 'name',
    needLocal: true,
    order: 'desc',
  },
};

// Min Max price in cents
interface Price {
  max?: number;
  min?: number;
  onlyDiscounted?: boolean;
}

export interface UseProductsOptions {
  attributes?: Record<string, string[]>;
  category?: string;
  limit?: number;
  offset?: number;
  price?: Price;
  search?: string;
  sort?: keyof typeof SortType;
}

const useProducts = (options?: UseProductsOptions) => {
  const api = useApi();
  const { priceInfo } = usePriceInfo();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const {
    sort: sortName,
    category,
    search,
    offset = 0,
    limit = 12,
    price,
    attributes,
  } = options ?? {};

  const sort = sortName && SortType[sortName] ? SortType[sortName] : undefined;
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

  return useQuery({
    queryFn: () =>
      api()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: facets,
            offset,
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
      `offset:${offset}`,
      `limit:${limit}`,
      `sort:${sortName}`,
      `category:${category}`,
      `minPrice:${price?.min}`,
      `maxPrice:${price?.max}`,
      `onlyDiscounted:${price?.onlyDiscounted}`,
      `attributes:${JSON.stringify(attributes)}`,
    ],
    retry: false,
  });
};

export default useProducts;
