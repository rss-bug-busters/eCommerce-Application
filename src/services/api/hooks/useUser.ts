import useApi from '@services/api/hooks/useApi';
import makeClient from '@services/api/client/client';
import {
  createApiBuilderFromCtpClient,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { clear } from '@services/api/client/utils/tokenCache';
import RoutePaths from '@utils/consts/RoutePaths';
import { redirect } from 'react-router-dom';

const login = (email: string, password: string) =>
  createApiBuilderFromCtpClient(makeClient({ user: { password, username: email } }))
    .withProjectKey({
      projectKey: VITE_COMMERCETOOLS_PROJECT_KEY,
    })
    .me()
    .get()
    .execute();

const logout = () => {
  clear();
  redirect(RoutePaths.MAIN);
};

const useUser = () => {
  const { apiRoot } = useApi();

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
        createApiBuilderFromCtpClient(makeClient({ user: { password, username: email } }))
          .withProjectKey({
            projectKey: VITE_COMMERCETOOLS_PROJECT_KEY,
          })
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
