import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const localStorageKey = '@commercetools:tokenCache';

const tokenCache: TokenCache = {
  get: (): TokenStore => {
    try {
      return JSON.parse(localStorage.getItem(localStorageKey) ?? '{}') as TokenStore;
    } catch {
      return {};
    }
  },
  set: (cache) => {
    localStorage.setItem(localStorageKey, JSON.stringify(cache));
  },
};

const clearTokenCache = () => {
  localStorage.removeItem(localStorageKey);
};

export { tokenCache, clearTokenCache };
