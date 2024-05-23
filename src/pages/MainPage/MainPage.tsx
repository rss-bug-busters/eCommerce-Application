import RoutePaths from '@utils/consts/RoutePaths';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div data-testid="main-page" className="flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-4 max-w-xl">
        Crafting Comfort, Redefining Spaces. Your Home, Your Signature Style!
      </h1>
      <p className="text-center text-gray-700 dark:text-zinc-200/75 mb-8 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in
        molestie feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat
      </p>
      <div className="flex gap-4 text-xl">
        <Link
          to={RoutePaths.LOGIN}
          className="font-semibold text-zinc-600 hover:text-zinc-400 hover:scale-110"
        >
          Log in
        </Link>
        <Link
          to={RoutePaths.REGISTRATION}
          className="font-semibold text-zinc-600 hover:text-zinc-400 hover:scale-110"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
