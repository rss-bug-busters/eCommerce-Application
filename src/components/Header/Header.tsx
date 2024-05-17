import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = function () {
  return (
    <header className="sticky flex justify-between items-center bg-slate-50 z-50 top-0 p-4 border-b shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-700">eCommerce</h1>
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
    </header>
  );
};

export default Header;
