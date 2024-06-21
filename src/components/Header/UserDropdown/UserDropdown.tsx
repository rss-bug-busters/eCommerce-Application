import { FC, useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '@hooks/user';
import { useUserQueries } from '@services/api/commercetools/hooks';
import { Link } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import Profile from '@assets/svg/profile.svg?react';
import clsx from 'clsx';

const UserDropdown: FC = function () {
  const [isOpen, setIsOpen] = useState(false);
  const menuReference = useRef<HTMLDivElement>(null);
  const { logout } = useUserQueries();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const { isError, isSuccess, error, data } = useCurrentUser();

  useEffect(() => {
    if (isSuccess) {
      setUserName(`${data.body.firstName} ${data.body.lastName}`);
      setIsLogin(true);
    }

    if (isError && (error.statusCode === 403 || error.statusCode === 401)) {
      setIsLogin(false);
    }
  }, [data, error, isError, isSuccess]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuReference.current && !menuReference.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuReference}>
      <button type="button" onClick={handleToggle} className="flex items-center gap-2">
        <span className="sr-only">User</span>
        <Profile className="h-6 w-6" />
        <span
          className={clsx(
            'h-2 w-2 border-b-2 border-r-2 border-cyan-900 transition-all duration-300 dark:border-zinc-100',
            isOpen ? '-rotate-[135deg]' : 'rotate-45'
          )}
        />
      </button>
      {isOpen && (
        <div className="component-box absolute right-0 z-10 mt-2 flex w-max flex-col items-center gap-1">
          {isLogin ? (
            <>
              <span className="">{`Hi, ${userName}`}</span>
              <Link className="navlink" to={RoutePaths.PROFILE}>
                Profile
              </Link>
              <span className="h-[1px] w-2/3 bg-zinc-400 dark:bg-zinc-600" />
              <button
                type="button"
                className="navlink"
                onClick={() => logout().then(() => setIsLogin(false))}
              >
                Logout
              </button>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <Link to={RoutePaths.LOGIN} className="navlink">
                Log in
              </Link>
              <span className="h-6 w-[1px] bg-zinc-500" />
              <Link to={RoutePaths.REGISTRATION} className="navlink">
                Sign up
              </Link>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
