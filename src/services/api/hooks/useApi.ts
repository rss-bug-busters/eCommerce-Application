import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import makeClient, { MakeClientOptions } from '@services/api/client/client';
import { projectKey } from '@services/api/client/options/credential';

const apiRoot = (properties?: MakeClientOptions) =>
  createApiBuilderFromCtpClient(makeClient(properties)).withProjectKey({
    projectKey,
  });

const useApi = () => ({ apiRoot });

export default useApi;
