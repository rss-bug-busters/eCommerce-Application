import useCurrentUser from '@hooks/useCurrentUser';
import useUserQueries from '@services/api/hooks/useUserQueries';
import RoutePaths from '@utils/consts/RoutePaths';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '@assets/svg/profile.svg?react';

const Header: FC = function () {
  const { logout } = useUserQueries();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const { isError, isSuccess, error, data } = useCurrentUser();

  useEffect(() => {
    if (isSuccess) {
      setEmail(data.body.email);
      setIsLogin(true);
    }

    if (isError && (error.statusCode === 403 || error.statusCode === 401)) {
      setIsLogin(false);
    }
  }, [data, error, isError, isSuccess]);

  return (
    <header className="sticky flex justify-between items-center bg-slate-50 z-50 top-0 p-2 border-b shadow-2xl">
      <Link to={RoutePaths.MAIN}>
        <h1 className="text-3xl font-bold text-gray-700">eCommerce</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link to={RoutePaths.MAIN} className="font-bold text-blue-900 cursor-pointer">
          Home
        </Link>
        <Link to={RoutePaths.PRODUCT} className="font-bold text-blue-900 cursor-pointer">
          Products
        </Link>
        <Link to={RoutePaths.ABOUT} className="font-bold text-blue-900 cursor-pointer">
          About us
        </Link>
      </div>
      {isLogin ? (
        <div className="flex items-center justify-end gap-4">
          <span>{email}</span>
          <span>
            <Profile />
          </span>
          <button
            type="button"
            className="font-bold text-blue-900 cursor-pointer"
            onClick={() => logout().then(() => setIsLogin(false))}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-4">
          <Link
            to={RoutePaths.REGISTRATION}
            className="font-bold text-blue-900 cursor-pointer"
          >
            Register
          </Link>
          <Link to={RoutePaths.LOGIN} className="font-bold text-blue-900 cursor-pointer">
            Log in
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
