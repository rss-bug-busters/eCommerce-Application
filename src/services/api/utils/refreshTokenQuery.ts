import { authUrl, basicToken } from '@services/api/options/credential';

const refreshTokenQuery = (refreshTokens: string) => {
  const headers = new Headers();

  headers.set('Authorization', basicToken);
  headers.set('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();

  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refreshTokens);

  return fetch(`${authUrl}/oauth/token`, {
    method: 'POST',
    headers,
    body,
  });
};

export default refreshTokenQuery;
