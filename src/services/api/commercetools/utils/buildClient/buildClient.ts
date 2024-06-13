import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { projectKey } from '@services/api/commercetools/credential';
import {
  tokenCache,
  clearTokenCache,
} from '@services/api/commercetools/utils/tokenCache';
import BuildClientOptions from '@services/api/commercetools/utils/buildClient/types/BuildClientOptions';
import {
  httpMiddlewareOptions,
  refreshAuthMiddlewareOptions,
  anonymousAuthMiddlewareOptions,
  passwordAuthMiddlewareOptions,
} from '@services/api/commercetools/options';
import refreshTokenMiddleware from '@services/api/commercetools/utils/middleware/refreshTokenMiddleware';

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
