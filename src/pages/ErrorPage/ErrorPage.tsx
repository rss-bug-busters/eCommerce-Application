import { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';

const ErrorPage: FC = function () {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page" data-testid="error-page">
        <h1>Oops! Something went wrong 😢</h1>
        <h2>{`${error.status} ${error.statusText}`}</h2>
        <p>{error.data}</p>
        <Link to={RoutePaths.MAIN}>Go Main page</Link>
      </div>
    );
  }

  return (
    <div id="error-page" data-testid="error-page">
      <h1>Oops! Something went wrong 😢</h1>
      <Link to={RoutePaths.MAIN}>Go Main page</Link>
    </div>
  );
};

export default ErrorPage;
