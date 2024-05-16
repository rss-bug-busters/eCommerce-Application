import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import makeClient from '@services/api/client/client';
import { projectKey } from '@services/api/client/options/credential';

const apiRoot = () =>
  createApiBuilderFromCtpClient(makeClient()).withProjectKey({
    projectKey,
  });

const useApi = () => ({ apiRoot });

export default useApi;
