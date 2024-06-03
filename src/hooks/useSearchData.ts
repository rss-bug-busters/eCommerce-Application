import { useSearchParams } from 'react-router-dom';

const useSearchData = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const reset = () =>
    setSearchParameters({
      ...Object.fromEntries(searchParameters.entries()),
      minPrice: '',
      maxPrice: '',
      search: '',
      sort: '',
      category: '',
      onlyDiscounted: '',
    });

  const minPrice = searchParameters.get('minPrice')
    ? Number.parseInt(searchParameters.get('minPrice')!, 10)
    : undefined;
  const maxPrice = searchParameters.get('maxPrice')
    ? Number.parseInt(searchParameters.get('maxPrice')!, 10)
    : undefined;

  return {
    reset,
    minPrice,
    maxPrice,
    search: searchParameters.get('search') ?? undefined,
    sort: searchParameters.get('sort') ?? undefined,
    category: searchParameters.get('category') ?? undefined,
    onlyDiscounted: searchParameters.get('onlyDiscounted') === 'true',
  };
};

export default useSearchData;
