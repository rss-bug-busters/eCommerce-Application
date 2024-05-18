import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { useQuery } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';

const useCurrentUser = () => {
  const { user } = useUserQueries();

  return useQuery<ClientResponse<Customer>, HttpErrorType>({
    queryFn: user,
    queryKey: [QueryKeys.USER],
    retry: false,
  });
};

export default useCurrentUser;
