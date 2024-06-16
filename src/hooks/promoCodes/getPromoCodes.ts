import useApi from '@services/api/commercetools/hooks/useApi';
import { useQuery } from '@tanstack/react-query';

function usePromoCodes() {
  const api = useApi();

  return useQuery({
    queryFn: () =>
      api({ needAnonymousAuth: true })
        .discountCodes()
        .get()
        .execute()
        .then((codes) => codes),
    queryKey: ['discount-codes'],
  });
}

export default usePromoCodes;
