import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import useApi from '@services/api/hooks/useApi';

const useProducts = () => {
  const api = useApi();

  return useQuery({
    queryFn: () =>
      api()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 12,
          },
        })
        .execute(),
    queryKey: [QueryKeys.CATALOG_PRODUCTS],
    retry: false,
  });
};

export default useProducts;
