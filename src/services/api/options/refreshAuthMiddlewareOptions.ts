import { RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
} from '@services/api/options/credential';
import { tokenCache } from '@services/api/utils/tokenCache';

const refreshAuthMiddlewareOptions = (token: string) => {
  const options: RefreshAuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    refreshToken: token,
    tokenCache,
    fetch,
  };

  return options;
};

export default refreshAuthMiddlewareOptions;
