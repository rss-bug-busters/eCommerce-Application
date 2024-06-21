import {
  buildClient,
  BuildClientOptions,
} from '@services/api/commercetools/utils/buildClient';
import { useQueryClient } from '@tanstack/react-query';

const useClient = () => {
  const client = useQueryClient();

  return (makeClientOptions?: BuildClientOptions) =>
    buildClient({
      queryClient: client,
      ...makeClientOptions,
    });
};

export default useClient;
