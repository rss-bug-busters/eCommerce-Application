import { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/options/credential';
import { tokenCache } from '@services/api/utils/tokenCache';

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
