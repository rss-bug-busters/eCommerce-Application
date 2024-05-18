import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import useClient from '@services/api/hooks/useClient';
import { projectKey } from '@services/api/options/credential';
import { BuildClientOptions } from '@services/api/utils/buildClient';

const useApi = () => {
  const apiClient = useClient();

  return (properties?: BuildClientOptions) =>
    createApiBuilderFromCtpClient(apiClient(properties)).withProjectKey({
      projectKey,
    });
};

export default useApi;
