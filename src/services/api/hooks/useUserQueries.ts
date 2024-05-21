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

  const login = async ({ email, password }: { email: string; password: string }) => {
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
      )
      .then(async (response) => {
        if (response.statusCode === 200) {
          await client.resetQueries();
        }

        return response;
      }); // убрать после добавления мутации на регистрацию

  const user = async () => api().me().get().execute();

  const addShippingAddress = async (addressKey: string, version: number) =>
    api()
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'addShippingAddressId',
              addressKey,
            },
          ],
          version,
        },
      })
      .execute()
      .then(user);

  const addBillingAddress = async (addressKey: string, version: number) =>
    api()
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'addBillingAddressId',
              addressKey,
            },
          ],
          version,
        },
      })
      .execute()
      .then(user);

  return {
    user,
    register,
    login,
    logout,
    addShippingAddress,
    addBillingAddress,
  };
};

export default useUserQueries;
