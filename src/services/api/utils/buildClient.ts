import { ClientBuilder, Dispatch } from '@commercetools/sdk-client-v2';
import { projectKey } from '@services/api/options/credential';
import httpMiddlewareOptions from '@services/api/options/httpMiddlewareOptions';
import authMiddlewareOptions from '@services/api/options/authMiddlewareOptions';
import { tokenCache, clearTokenCache } from '@services/api/utils/tokenCache';
import passwordAuthMiddlewareOptions from '@services/api/options/passwordAuthMiddlewareOptions';
import anonymousAuthMiddlewareOptions from '@services/api/options/anonymousAuthMiddlewareOptions';
import refreshAuthMiddlewareOptions from '@services/api/options/refreshAuthMiddlewareOptions';
import { QueryClient } from '@tanstack/react-query';

export interface BuildClientOptions {
  queryClient?: QueryClient;
  user?: { password: string; username: string };
}

const buildClient = (makeClientOptions?: BuildClientOptions) => {
  let client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions);

  if (+VITE_COMMERCETOOLS_USE_LOGGER) {
    client = client.withLoggerMiddleware();
  }

  if (makeClientOptions?.user) {
    clearTokenCache();

    client = client.withPasswordFlow(
      passwordAuthMiddlewareOptions(makeClientOptions?.user)
    );

    return client.build();
  }

  client = tokenCache.get().token
    ? client.withExistingTokenFlow(tokenCache.get().token, { force: true })
    : client.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);

  if (tokenCache.get().refreshToken) {
    client = client.withRefreshTokenFlow(
      refreshAuthMiddlewareOptions(tokenCache.get().refreshToken!)
    );
  }

  if (makeClientOptions?.queryClient) {
    const on401ErrorMiddleware =
      (action: Dispatch): Dispatch =>
      async (request, response) => {
        if (response.statusCode === 401) {
          clearTokenCache();
          await makeClientOptions?.queryClient?.resetQueries();
        }

        return action(request, response);
      };

    client = client.withAfterExecutionMiddleware({
      middleware: () => on401ErrorMiddleware,
    });
  }

  return client.build();
};

export default buildClient;
