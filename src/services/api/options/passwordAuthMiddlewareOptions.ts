import {
  authUrl,
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '@services/api/options/credential';
import { PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { tokenCache } from '@services/api/utils/tokenCache';

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
