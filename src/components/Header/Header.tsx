import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import BlachowoSVG from '@assets/svg/blachowo.svg?react';
import BasketLink from '@components/Header/BasketLink/BasketLink';
import ThemeSwitcher from '@components/Header/ThemeSwitcher/ThemeSwitcher';
import UserDropdown from './UserDropdown/UserDropdown';

const Header: FC = function () {
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
          <Link to={RoutePaths.CATALOG} className="navlink">
            Catalog
          </Link>
          <Link to={RoutePaths.ABOUT} className="navlink">
            About us
          </Link>
        </div>
        <div className="flex items-center justify-end gap-4">
          <ThemeSwitcher />
          <UserDropdown />
          <BasketLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
