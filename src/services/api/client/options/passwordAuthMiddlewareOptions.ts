import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/client/options/credential';
import fetch from 'cross-fetch';
import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import tokenCache from '@services/api/client/utils/tokenCache';

const passwordAuthMiddlewareOptions = ({
  username,
  password,
}: {
  password: string;
  username: string;
}) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password,
      },
    },
    scopes,
    fetch,
    tokenCache,
  };

  return options;
};

export default passwordAuthMiddlewareOptions;
