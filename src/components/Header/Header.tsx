import { useCurrentUser } from '@hooks/user';
import { useUserQueries } from '@services/api/commercetools/hooks';
import RoutePaths from '@utils/consts/RoutePaths';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '@assets/svg/profile.svg?react';
import BlachowoSVG from '@assets/svg/blachowo.svg?react';
import BasketLink from '@components/Header/BasketLink/BasketLink';
import ThemeSwitcher from '@components/Header/ThemeSwitcher/ThemeSwitcher';

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
    <header className="sticky top-0 z-10 border-b bg-zinc-50 p-2 px-6 text-cyan-900 shadow-xl dark:border-none dark:bg-zinc-800 dark:text-white/75 dark:shadow-zinc-700/90">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to={RoutePaths.MAIN}>
          <div className="flex flex-row items-center text-cyan-900 hover:text-zinc-500 dark:text-current">
            <BlachowoSVG className="w-22 h-12" />
            {/* <h1 className="px-2 text-2xl font-bold ">Blachowo</h1> */}
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            to={RoutePaths.CATALOG}
            className="cursor-pointer font-bold hover:underline"
          >
            Catalog
          </Link>
          <Link
            to={RoutePaths.ABOUT}
            className="cursor-pointer font-bold hover:underline"
          >
            About us
          </Link>
        </div>
        <div className="flex  items-center justify-end gap-4">
          {isLogin ? (
            <>
              <Link className="flex gap-2" to={RoutePaths.PROFILE}>
                <span className="cursor-pointer font-bold hover:underline">
                  {userName}
                </span>
                <span>
                  <Profile className="h-6 w-6" />
                </span>
              </Link>

              <button
                type="button"
                className="cursor-pointer font-bold hover:underline"
                onClick={() => logout().then(() => setIsLogin(false))}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={RoutePaths.LOGIN}
                className="cursor-pointer font-bold hover:underline"
              >
                Log in
              </Link>
              <Link
                to={RoutePaths.REGISTRATION}
                className="cursor-pointer font-bold hover:underline"
              >
                Sign up
              </Link>
            </>
          )}
          <ThemeSwitcher />
          <BasketLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
