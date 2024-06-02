const clientId = VITE_COMMERCETOOLS_CLIENT_ID;
const clientSecret = VITE_COMMERCETOOLS_SECRET;
const scopes = VITE_COMMERCETOOLS_SCOPE.split(' ');
const projectKey = VITE_COMMERCETOOLS_PROJECT_KEY;
const authUrl = VITE_COMMERCETOOLS_AUTH_URL;
const apiUrl = VITE_COMMERCETOOLS_API_URL;
const btoaToken = btoa(`${clientId}:${clientSecret}`);
const basicToken = `Basic ${btoaToken}`;

export {
  clientId,
  clientSecret,
  scopes,
  projectKey,
  authUrl,
  apiUrl,
  btoaToken,
  basicToken,
};
