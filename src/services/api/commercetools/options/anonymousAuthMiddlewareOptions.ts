import { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/commercetools/credential';
import { tokenCache } from '@services/api/commercetools/utils/tokenCache';

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
  tokenCache,
};

export default anonymousAuthMiddlewareOptions;
