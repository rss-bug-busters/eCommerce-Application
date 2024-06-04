import { useSearchParams } from 'react-router-dom';
import filterAttributes from '@utils/consts/filterAtributes';
import { useEffect, useState } from 'react';

const useSearchData = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const [category, setCategory] = useState<string | undefined>(
    searchParameters.get('category') ?? undefined
  );

  const reset = () =>
    setSearchParameters({
      ...Object.fromEntries(searchParameters.entries()),
      minPrice: [],
      maxPrice: [],
      search: [],
      sort: [],
      category: [],
      onlyDiscounted: [],
      ...Object.fromEntries(filterAttributes.map(({ name }) => [name, []])),
    });

  const minPrice = searchParameters.get('minPrice')
    ? Number.parseInt(searchParameters.get('minPrice')!, 10)
    : undefined;
  const maxPrice = searchParameters.get('maxPrice')
    ? Number.parseInt(searchParameters.get('maxPrice')!, 10)
    : undefined;

  const attributes: Record<string, string[]> = {};

  for (const { name } of filterAttributes) {
    attributes[name] = searchParameters.getAll(name);
  }

  useEffect(() => {
    const newCategory = searchParameters.get('category') ?? undefined;

    if (category !== newCategory) {
      setCategory(newCategory);
      setSearchParameters({
        ...Object.fromEntries(searchParameters.entries()),
        ...Object.fromEntries(filterAttributes.map(({ name }) => [name, []])),
      });
    }
  }, [category, searchParameters, setSearchParameters]);

  return {
    reset,
    attributes,
    minPrice,
    maxPrice,
    search: searchParameters.get('search') ?? undefined,
    sort: searchParameters.get('sort') ?? undefined,
    category,
    onlyDiscounted: searchParameters.get('onlyDiscounted') === 'true',
  };
};

export default useSearchData;
