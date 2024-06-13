import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { BuildClientOptions } from '@services/api/commercetools/utils/buildClient';
import { projectKey } from '@services/api/commercetools/credential';
import useClient from './useClient';

const useApi = () => {
  const apiClient = useClient();

  return (properties?: BuildClientOptions) =>
    createApiBuilderFromCtpClient(apiClient(properties)).withProjectKey({
      projectKey,
    });
};

export default useApi;
