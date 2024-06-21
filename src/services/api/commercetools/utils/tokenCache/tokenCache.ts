import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import storageKey from './storageKey';

const tokenCache: TokenCache = {
  get: (): TokenStore => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? '{}') as TokenStore;
    } catch {
      return {} as TokenStore;
    }
  },
  set: (cache) => {
    localStorage.setItem(storageKey, JSON.stringify(cache));
  },
};

export default tokenCache;
