import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const localStorageKey = '@commercetools:tokenCache';

const tokenCache: TokenCache = {
  get: (): TokenStore =>
    JSON.parse(localStorage.getItem(localStorageKey) ?? '{}') as TokenStore,
  set: (cache) => {
    localStorage.setItem(localStorageKey, JSON.stringify(cache));
  },
};

export const clear = () => {
  localStorage.removeItem(localStorageKey);
};

export default tokenCache;
