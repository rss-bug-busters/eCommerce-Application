import { MyCustomerDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import {
  clearTokenCache,
  tokenCache,
} from '@services/api/commercetools/utils/tokenCache';
import { useQueryClient } from '@tanstack/react-query';
import { revokeTokensQuery } from '@services/api/commercetools/utils/queryes';
import useApi from './useApi';

const useUserQueries = () => {
  const api = useApi();
  const client = useQueryClient();

  const logout = async () => {
    await revokeTokensQuery().catch(() => {});
    clearTokenCache();
    await client.resetQueries();
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const oldToken = tokenCache.get();

    if (oldToken.token) {
      await api()
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
    }

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
    api({ needAnonymousAuth: true })
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

  const user = async () => api({ needAnonymousAuth: true }).me().get().execute();

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
      .execute();

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
      .execute();
  const addActions = async (version: number, actions: MyCustomerUpdateAction[]) =>
    api()
      .me()
      .post({
        body: {
          actions,
          version,
        },
      })
      .execute()
      .then(user);
  const changePassword = async (
    version: number,
    currentPassword: string,
    newPassword: string,
    email: string
  ) =>
    api()
      .me()
      .password()
      .post({
        body: {
          version,
          currentPassword,
          newPassword,
        },
      })
      .execute()
      .then(() =>
        api({ user: { password: newPassword, username: email } })
          .me()
          .get()
          .execute()
      );

  return {
    user,
    register,
    login,
    logout,
    addShippingAddress,
    addBillingAddress,
    addActions,
    changePassword,
  };
};

export default useUserQueries;
