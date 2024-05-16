import { ClientBuilder } from '@commercetools/sdk-client-v2';
import authMiddlewareOptions from '@services/api/client/options/authMiddlewareOptions';
import httpMiddlewareOptions from '@services/api/client/options/httpMiddlewareOptions';
import anonymousAuthMiddlewareOptions from '@services/api/client/options/anonymousAuthMiddlewareOptions';
import tokenCache, { clear } from '@services/api/client/utils/tokenCache';
import refreshAuthMiddlewareOptions from '@services/api/client/options/refreshAuthMiddlewareOptions';
import passwordAuthMiddlewareOptions from '@services/api/client/options/passwordAuthMiddlewareOptions';
import { projectKey } from '@services/api/client/options/credential';

export interface MakeClientOptions {
  user?: { password: string; username: string };
  withLogger?: boolean;
}
const makeClient = (makeClientOptions?: MakeClientOptions) => {
  let client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions);

  if (makeClientOptions?.withLogger ?? true) {
    client = client.withLoggerMiddleware();
  }

  if (makeClientOptions?.user) {
    clear();

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

  return client.build();
};

export default makeClient;
