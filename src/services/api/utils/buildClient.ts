import { ClientBuilder, Dispatch } from '@commercetools/sdk-client-v2';
import { projectKey } from '@services/api/options/credential';
import httpMiddlewareOptions from '@services/api/options/httpMiddlewareOptions';
import { tokenCache, clearTokenCache } from '@services/api/utils/tokenCache';
import passwordAuthMiddlewareOptions from '@services/api/options/passwordAuthMiddlewareOptions';
import anonymousAuthMiddlewareOptions from '@services/api/options/anonymousAuthMiddlewareOptions';
import { QueryClient } from '@tanstack/react-query';

import refreshTokenQuery from '@services/api/utils/refreshTokenQuery';
import authMiddlewareOptions from '@services/api/options/authMiddlewareOptions';

export interface BuildClientOptions {
  queryClient?: QueryClient;
  user?: { password: string; username: string };
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

const buildClient = (makeClientOptions?: BuildClientOptions) => {
  const refreshMiddleware =
    (action: Dispatch): Dispatch =>
    async (request, response) => {
      if (response.statusCode === 401) {
        const token = tokenCache.get();

        if (!token.refreshToken) {
          clearTokenCache();
          await makeClientOptions?.queryClient?.resetQueries();

          return action(request, response);
        }

        if (token.refreshToken) {
          const refreshResp = await refreshTokenQuery(token.refreshToken);

          if (refreshResp.status === 400) {
            clearTokenCache();
            await makeClientOptions?.queryClient?.resetQueries();

            return action(request, response);
          }

          if (refreshResp.ok) {
            const refreshRespData = (await refreshResp.json()) as TokenResponse;

            tokenCache.set({
              token: refreshRespData.access_token,
              expirationTime: Date.now() + refreshRespData.expires_in * 1000,
              refreshToken: token.refreshToken,
            });

            await makeClientOptions?.queryClient?.resetQueries();
          }
        }
      }

      return action(request, response);
    };

  let client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withAfterExecutionMiddleware({
      middleware: () => refreshMiddleware,
    });

  if (makeClientOptions?.user) {
    clearTokenCache();

    client = client.withPasswordFlow(
      passwordAuthMiddlewareOptions(makeClientOptions?.user)
    );

    return client.build();
  }

  client = tokenCache.get().token
    ? client.withExistingTokenFlow(`Bearer ${tokenCache.get().token}`, { force: false })
    : client.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);

  if (+VITE_COMMERCETOOLS_USE_LOGGER) {
    client = client.withLoggerMiddleware();
  }

  return client.build();
};

export default buildClient;
