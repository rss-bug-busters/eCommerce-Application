import useApi from '@services/api/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@utils/consts/QueryKeys';

const useCategory = () => {
  const api = useApi();

  return useQuery({
    queryFn: () =>
      api({
        needAnonymousAuth: true,
      })
        .categories()
        .get({
          queryArgs: {
            limit: 500,
          },
        })
        .execute(),
    queryKey: [queryKeys.CATEGORY, 'all'],
    retry: false,
  });
};

export default useCategory;