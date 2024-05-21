import useCurrentUser from '@hooks/useCurrentUser';
import useUserQueries from '@services/api/hooks/useUserQueries';
import RoutePaths from '@utils/consts/RoutePaths';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '@assets/svg/profile.svg?react';

const Header: FC = function () {
  const { logout } = useUserQueries();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const { isError, isSuccess, error, data } = useCurrentUser();

  useEffect(() => {
    if (isSuccess) {
      setUserName(`${data.body.firstName} ${data.body.lastName?.slice(0, 1)}`);
      setIsLogin(true);
    }

    if (isError && (error.statusCode === 403 || error.statusCode === 401)) {
      setIsLogin(false);
    }
  }, [data, error, isError, isSuccess]);

  return (
    <header className="sticky text-zinc-900/75 dark:text-white/75 flex flex-wrap justify-between items-center bg-zinc-50 z-50 top-0 p-2 border-b dark:border-none shadow-xl dark:shadow-zinc-700/90 dark:bg-zinc-800">
      <Link to={RoutePaths.MAIN}>
        <h1 className="text-3xl px-2 dark:text-zinc-200 hover:text-zinc-500 font-semibold">
          eCommerce
        </h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link to={RoutePaths.MAIN} className=" font-bold hover:underline cursor-pointer">
          Home
        </Link>
        <Link
          to={RoutePaths.PRODUCT}
          className="font-bold hover:underline cursor-pointer"
        >
          Products
        </Link>
        <Link to={RoutePaths.ABOUT} className="font-bold hover:underline cursor-pointer">
          About us
        </Link>
      </div>
      {isLogin ? (
        <div className="flex items-center justify-end gap-4">
          <Link className="flex gap-2" to={RoutePaths.PROFILE}>
            <span className="font-bold hover:underline cursor-pointer">{userName}</span>
            <span>
              <Profile className="w-6 h-6" />
            </span>
          </Link>

          <button
            type="button"
            className="font-bold hover:underline cursor-pointer"
            onClick={() => logout().then(() => setIsLogin(false))}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex  items-center justify-end gap-4">
          <Link
            to={RoutePaths.REGISTRATION}
            className="font-bold hover:underline cursor-pointer"
          >
            Register
          </Link>
          <Link
            to={RoutePaths.LOGIN}
            className="font-bold hover:underline cursor-pointer"
          >
            Log in
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
