import { clearTokenCache, tokenCache } from '@services/api/utils/tokenCache';
import { HttpErrorType, TokenStore } from '@commercetools/sdk-client-v2';
import buildClient, { BuildClientOptions } from '@services/api/utils/buildClient';
import { projectKey } from '@services/api/options/credential';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const sessions: {
  anonymous?: TokenStore;
  password?: TokenStore;
} = {
  password: undefined,
  anonymous: undefined,
};

const api = (properties?: BuildClientOptions) =>
  createApiBuilderFromCtpClient(buildClient(properties)).withProjectKey({
    projectKey,
  });

const preparePasswordToken = async (username: string, password: string) => {
  if (!sessions.password) {
    const credentials = {
      username,
      password,
    };

    await api({
      user: credentials,
    })
      .me()
      .get()
      .execute()
      .catch(() => {
        throw new Error('User password session preparation failed');
      });

    sessions.password = tokenCache.get();
  }
};

const prepareAnonymousToken = async () => {
  if (!sessions.anonymous) {
    await api({ needAnonymousAuth: true })
      .me()
      .get()
      .execute()
      .catch((error: HttpErrorType) => {
        if (error.status !== 403) {
          throw new Error('User anonymous session preparation failed');
        }
      });

    sessions.anonymous = tokenCache.get();
  }
};

const userSessionPrepare = async (username: string, password: string) => {
  clearTokenCache();
  await preparePasswordToken(username, password);
  clearTokenCache();
  await prepareAnonymousToken();
  clearTokenCache();
};

const applyUserSession = (type: 'password' | 'anonymous') => {
  if (type === 'password' && sessions.password) {
    tokenCache.set(sessions.password);
  } else if (type === 'anonymous' && sessions.anonymous) {
    tokenCache.set(sessions.anonymous);
  }
};

export { applyUserSession, userSessionPrepare };
