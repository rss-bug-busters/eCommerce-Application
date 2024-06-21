import { authUrl, basicToken } from '@services/api/commercetools/credential';
import { tokenCache } from '@services/api/commercetools/utils/tokenCache';

const revokeTokensQuery = async () => {
  const url = `${authUrl}/oauth/token/revoke`;
  const { token, refreshToken } = tokenCache.get();

  const headers = new Headers();

  headers.set('Content-Type', 'application/x-www-form-urlencoded');
  headers.set('Authorization', basicToken);

  if (token) {
    await fetch(url, {
      method: 'POST',
      headers,
      body: new URLSearchParams({
        token,
        token_type_hint: 'access_token',
      }),
    }).catch(() => {});
  }

  if (refreshToken) {
    await fetch(url, {
      method: 'POST',
      headers,
      body: new URLSearchParams({
        token: refreshToken,
        token_type_hint: 'refresh_token',
      }),
    }).catch(() => {});
  }
};

export default revokeTokensQuery;
