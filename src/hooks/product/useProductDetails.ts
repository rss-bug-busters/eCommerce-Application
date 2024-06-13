import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import { useApi } from '@services/api/commercetools/hooks';

export interface UseDetailsOptions {
  ID: string;
}

const useProductDetails = ({ ID }: UseDetailsOptions) => {
  const api = useApi();

  return useQuery({
    queryFn: () => api().productProjections().withId({ ID }).get().execute(),
    queryKey: [QueryKeys.PRODUCT_DETAILS],
    retry: false,
  });
};

export default useProductDetails;
