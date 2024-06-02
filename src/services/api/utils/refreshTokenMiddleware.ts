import { Middleware } from '@commercetools/sdk-client-v2';
import { clearTokenCache, tokenCache } from '@services/api/utils/tokenCache';
import refreshTokenQuery from '@services/api/utils/refreshTokenQuery';
import { QueryClient } from '@tanstack/react-query';

const refreshTokenMiddleware =
  (queryClient?: QueryClient): Middleware =>
  (dispatch) =>
  async (request, response) => {
    const { expirationTime, refreshToken, token } = tokenCache.get();

    if (
      expirationTime &&
      refreshToken &&
      (Date.now() > expirationTime - 1000 * 60 * 6 || !token)
    ) {
      const refreshResp = await refreshTokenQuery(refreshToken);

      if (refreshResp.ok) {
        const refreshRespData = (await refreshResp.json()) as {
          access_token: string;
          expires_in: number;
          scope: string;
          token_type: string;
        };

        tokenCache.set({
          token: refreshRespData.access_token,
          expirationTime: Date.now() + refreshRespData.expires_in * 1000,
          refreshToken,
        });

        if (request?.headers) {
          request.headers['Authorization'] = `Bearer ${refreshRespData.access_token}`;
        }
      } else {
        clearTokenCache();

        await queryClient?.resetQueries();

        throw new Error('Error when trying to update a session');
      }
    }

    return dispatch(request, response);
  };

export default refreshTokenMiddleware;
