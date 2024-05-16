import useApi from '@services/api/hooks/useApi';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { clear } from '@services/api/client/utils/tokenCache';

const logout = () => {
  clear();
};

const useUser = () => {
  const { apiRoot } = useApi();

  const login = (email: string, password: string) =>
    apiRoot({ user: { password, username: email } })
      .me()
      .get()
      .execute();

  const register = ({ email, password, ...rest }: MyCustomerDraft) =>
    apiRoot()
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
        apiRoot({ user: { password, username: email } })
          .me()
          .get()
          .execute()
      );

  const getMe = () => apiRoot().me().get().execute();

  return {
    getMe,
    register,
    login,
    logout,
  };
};

export default useUser;
