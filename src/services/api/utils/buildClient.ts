import { ClientBuilder, Dispatch } from '@commercetools/sdk-client-v2';
import { projectKey } from '@services/api/options/credential';
import httpMiddlewareOptions from '@services/api/options/httpMiddlewareOptions';
import { tokenCache, clearTokenCache } from '@services/api/utils/tokenCache';
import passwordAuthMiddlewareOptions from '@services/api/options/passwordAuthMiddlewareOptions';
import anonymousAuthMiddlewareOptions from '@services/api/options/anonymousAuthMiddlewareOptions';
import { QueryClient } from '@tanstack/react-query';

import refreshTokenQuery from '@services/api/utils/refreshTokenQuery';

export interface BuildClientOptions {
  needAnonymousAuth?: boolean;
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
        const { token, refreshToken } = tokenCache.get();

        if (!refreshToken || !token) {
          clearTokenCache();

          return action(request, response);
        }

        if (refreshToken) {
          const refreshResp = await refreshTokenQuery(refreshToken);

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
              refreshToken,
            });

            await makeClientOptions?.queryClient?.resetQueries();
          }
        }
      }

      return action(request, response);
    };

  const { token } = tokenCache.get();

  let client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
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

  if (token) {
    client = client.withExistingTokenFlow(`Bearer ${token}`, { force: false });
  } else if (makeClientOptions?.needAnonymousAuth) {
    client = client.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
  }

  if (+VITE_COMMERCETOOLS_USE_LOGGER) {
    client = client.withLoggerMiddleware();
  }

  return client.build();
};

export default buildClient;
