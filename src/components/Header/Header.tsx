import RoutePaths from '@utils/consts/RoutePaths';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BlachowoSVG from '@assets/svg/blachowo.svg?react';
import MenuIcon from '@assets/svg/menu.svg?react';
import CrossIcon from '@assets/svg/cross.svg?react';
import BasketLink from '@components/Header/BasketLink/BasketLink';
import ThemeSwitcher from '@components/Header/ThemeSwitcher/ThemeSwitcher';
import UserDropdown from './UserDropdown/UserDropdown';

const Header: FC = function () {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b bg-zinc-50 p-2 px-6 text-cyan-900 shadow-xl dark:border-none dark:bg-zinc-800 dark:text-white/75 dark:shadow-zinc-700/90">
      <div className="container relative mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center rounded-lg bg-zinc-300 p-1 focus:bg-cyan-900 focus:text-white dark:bg-zinc-700 dark:focus:bg-zinc-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Menu</span>
              {isOpen ? (
                <CrossIcon className="block h-7 w-7" />
              ) : (
                <MenuIcon className="block h-7 w-7" />
              )}
            </button>
          </div>
          <Link to={RoutePaths.MAIN}>
            <div className="flex flex-row items-center text-cyan-900 hover:text-zinc-500 dark:text-current">
              <BlachowoSVG className="w-22 h-12" />
              {/* <h1 className="px-2 text-2xl font-bold ">Blachowo</h1> */}
            </div>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link to={RoutePaths.CATALOG} className="navlink">
              Catalog
            </Link>
            <Link to={RoutePaths.ABOUT} className="navlink">
              About us
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <ThemeSwitcher />
          <UserDropdown />
          <BasketLink />
        </div>
        {isOpen && (
          <div className="component-box absolute top-12 z-10 md:hidden">
            <div className="flex flex-col gap-2 space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <Link to={RoutePaths.CATALOG} className="navlink text-xl">
                Catalog
              </Link>
              <Link to={RoutePaths.ABOUT} className="navlink text-xl">
                About us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
