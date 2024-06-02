import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey } from '@services/api/options/credential';
import httpMiddlewareOptions from '@services/api/options/httpMiddlewareOptions';
import { tokenCache, clearTokenCache } from '@services/api/utils/tokenCache';
import passwordAuthMiddlewareOptions from '@services/api/options/passwordAuthMiddlewareOptions';
import anonymousAuthMiddlewareOptions from '@services/api/options/anonymousAuthMiddlewareOptions';
import { QueryClient } from '@tanstack/react-query';
import refreshTokenMiddleware from '@services/api/utils/refreshTokenMiddleware';
import refreshAuthMiddlewareOptions from '@services/api/options/refreshAuthMiddlewareOptions';

export interface BuildClientOptions {
  needAnonymousAuth?: boolean;
  queryClient?: QueryClient;
  user?: { password: string; username: string };
}

const buildClient = (makeClientOptions?: BuildClientOptions) => {
  const { token, refreshToken } = tokenCache.get();
  const { needAnonymousAuth, queryClient, user } = makeClientOptions ?? {};

  let client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions);

  if (user) {
    clearTokenCache();

    client = client.withPasswordFlow(passwordAuthMiddlewareOptions(user));

    return client.build();
  }

  if (token) {
    client = client.withExistingTokenFlow(`Bearer ${token}`, {
      force: true,
    });
  }

  if (refreshToken) {
    client = client.withRefreshTokenFlow(refreshAuthMiddlewareOptions(refreshToken));
  }

  if (!token && !refreshToken && needAnonymousAuth) {
    client = client.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
  }

  if (+VITE_COMMERCETOOLS_USE_LOGGER) {
    client = client.withLoggerMiddleware();
  }

  client = client.withMiddleware(refreshTokenMiddleware(queryClient));

  return client.build();
};

export default buildClient;
