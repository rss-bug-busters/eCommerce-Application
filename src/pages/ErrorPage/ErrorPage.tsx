import { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';
import Loader from '@components/ui/Loader/Loader';
import Layout from '@pages/Layout/Layout';

const ErrorPage: FC = function () {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Layout fallback={<Loader />}>
        <div
          id="error-page"
          data-testid="error-page"
          className="flex h-full flex-col items-center justify-center gap-5 text-center"
        >
          <h1 className="text-4xl font-bold uppercase text-red-500">
            {error.status} <br />
            {error.statusText}
          </h1>
          <h2 className="text-xl text-zinc-400">
            We could not find what you were looking for
            <p>{error.status !== 404 && error.data}</p>
          </h2>
          <Link to={RoutePaths.MAIN} className="text-xl font-semibold hover:underline">
            Go Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fallback={<Loader />}>
      <div
        id="error-page"
        data-testid="error-page"
        className="flex h-screen flex-col items-center justify-center gap-5 text-center"
      >
        <h1 className="text-4xl font-bold uppercase text-red-500">
          Oops! Something went wrong 😢
        </h1>
        <Link to={RoutePaths.MAIN} className="text-xl font-semibold hover:underline">
          Go Home
        </Link>
      </div>
    </Layout>
  );
};

export default ErrorPage;
