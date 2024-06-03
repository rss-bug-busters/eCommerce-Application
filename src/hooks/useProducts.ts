import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import useApi from '@services/api/hooks/useApi';
import { useTranslation } from 'react-i18next';
import usePriceInfo from '@hooks/usePriceInfo.ts';

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
  } = options ?? {};

  const sort = sortName && SortType[sortName] ? SortType[sortName] : undefined;
  const sortQuery = sort
    ? `${sort.field}${sort.needLocal ? '.' : ''}${sort.needLocal ? language : ''} ${sort.order}`
    : undefined;

  const filters: string[] = [].filter((item) => item !== undefined) as string[];

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

  const facets = [
    'variants.price.centAmount:range (0 to *) as price',
    'categories.id as category',
    `variants.attributes.finishes.label.${language} as finishes`,
    'variants.attributes.size as size',
    `variants.attributes.tags.label.${language} as tags`,
    // `variants.attributes.${'color-filter'}.label.${i18n.language} as color-filter`,
    // `variants.attributes.finishlabel.${i18n.language} as finishlabel`,
    // `variants.attributes.colorlabel.${i18n.language} as colorlabel`,
    //
    // 'variants.attributes.colorlabel counting products',
    // `variants.attributes.colorlabel.${i18n.language}`,
    // 'variants.attributes.colorlabel.key counting products',
    // 'variants.attributes.colorlabel.label counting products',
    // `variants.attributes.colorlabel.label.${i18n.language} counting products`,
  ];

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
    ],
    retry: false,
  });
};

export default useProducts;
