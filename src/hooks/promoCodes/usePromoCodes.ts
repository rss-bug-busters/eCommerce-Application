import useApi from '@services/api/commercetools/hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';

function usePromoCodes() {
  const api = useApi();

  return useQuery({
    queryFn: () =>
      api({ needAnonymousAuth: true })
        .discountCodes()
        .get()
        .execute()
        .then((codes) => codes),
    queryKey: [QueryKeys.DISCOUNT_CODES],
  });
}

export default usePromoCodes;
