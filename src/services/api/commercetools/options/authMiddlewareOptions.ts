import { AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/commercetools/credential';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

export default authMiddlewareOptions;
