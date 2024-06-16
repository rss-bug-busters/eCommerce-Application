import { Link } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';

function MainPage() {
  return (
    <div data-testid="main-page" className="grid">
      <div className="mb-9 mt-9 flex flex-col items-center">
        <h1 className="mb-4 max-w-xl text-center text-3xl font-bold">
          Crafting Comfort, Redefining Spaces. Your Home, Your Signature Style!
        </h1>
        <p className="mb-8 max-w-md text-center text-gray-700 dark:text-zinc-200/75">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in
          molestie feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat
        </p>
        <div className="flex gap-4 text-xl">
          <Link
            to={RoutePaths.LOGIN}
            className="font-semibold text-zinc-600 hover:scale-110 hover:text-zinc-400"
          >
            Log in
          </Link>
          <Link
            to={RoutePaths.REGISTRATION}
            className="font-semibold text-zinc-600 hover:scale-110 hover:text-zinc-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
