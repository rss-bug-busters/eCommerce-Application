import { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/client/options/credential';
import fetch from 'cross-fetch';
import tokenCache from '@services/api/client/utils/tokenCache';

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
