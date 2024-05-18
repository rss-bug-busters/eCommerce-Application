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

const preparePasswordToken = async () => {
  if (!sessions.password) {
    const credentials = {
      username: 'testuser@testing.test.com',
      password: 's53%qpQ"~S=!t#x\\FJuy$v@9mX;*,6:Y`fP\'+7w8',
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
    await api()
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

const userSessionPrepare = async () => {
  clearTokenCache();
  await preparePasswordToken();
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
