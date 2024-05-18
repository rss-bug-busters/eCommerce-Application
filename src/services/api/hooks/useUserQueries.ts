import useApi from '@services/api/hooks/useApi';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { clearTokenCache, tokenCache } from '@services/api/utils/tokenCache';
import { useQueryClient } from '@tanstack/react-query';

const useUserQueries = () => {
  const api = useApi();
  const client = useQueryClient();

  const logout = async () => {
    clearTokenCache();
    await client.resetQueries();
  };

  const login = async (email: string, password: string) => {
    const oldToken = tokenCache.get();

    return api({ user: { password, username: email } })
      .me()
      .get()
      .execute()
      .catch((error: unknown) => {
        if (oldToken.token) {
          tokenCache.set(oldToken);
        }

        throw error;
      });
  };

  const register = async ({ email, password, ...rest }: MyCustomerDraft) =>
    api()
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
          ...rest,
        },
      })
      .execute()
      .then(() =>
        api({ user: { password, username: email } })
          .me()
          .get()
          .execute()
      );

  const user = async () => api().me().get().execute();

  return {
    user,
    register,
    login,
    logout,
  };
};

export default useUserQueries;