import storageKey from './storageKey';

const clearTokenCache = () => {
  localStorage.removeItem(storageKey);
};

export default clearTokenCache;
