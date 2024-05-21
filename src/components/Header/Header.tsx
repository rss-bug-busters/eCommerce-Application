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
    <header className="sticky dark:text-white/75 flex flex-wrap justify-between items-center bg-slate-50 z-50 top-0 p-2 border-b dark:border-none shadow-2xl dark:bg-stone-900">
      <Link to={RoutePaths.MAIN}>
        <h1 className="text-3xl dark:text-white font-semibold">eCommerce</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link
          to={RoutePaths.MAIN}
          className=" font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer"
        >
          Home
        </Link>
        <Link
          to={RoutePaths.PRODUCT}
          className="font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer"
        >
          Products
        </Link>
        <Link
          to={RoutePaths.ABOUT}
          className="font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer"
        >
          About us
        </Link>
      </div>
      {isLogin ? (
        <div className="flex items-center justify-end gap-4">
          <span className="font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer">
            {email}
          </span>
          <span>
            <Profile />
          </span>
          <button
            type="button"
            className="font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer"
            onClick={() => logout().then(() => setIsLogin(false))}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex  items-center justify-end gap-4">
          <Link
            to={RoutePaths.REGISTRATION}
            className="font-bold hover:underline text-blue-900 dark:text-white/75 cursor-pointer"
          >
            Register
          </Link>
          <Link
            to={RoutePaths.LOGIN}
            className="font-bold hover:underline  text-blue-900 dark:text-white/75 cursor-pointer"
          >
            Log in
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
