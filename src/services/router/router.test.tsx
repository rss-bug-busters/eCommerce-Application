import { describe } from 'vitest';
import RoutePaths from '@utils/consts/RoutePaths';
import routeIsRenderedByTestId from '@tests/utils/routeIsRenderedByTestId';

enum PagesTestIds {
  ABOUT = 'about-page',
  BASKET = 'basket-page',
  ERROR = 'error-page',
  LOGIN = 'login-page',
  MAIN = 'main-page',
  PRODUCT = 'product-page',
  PROFILE = 'profile-page',
  REGISTRATION = 'registration-page',
}

describe('all routes rendered', async () => {
  routeIsRenderedByTestId({
    route: RoutePaths.MAIN,
    testId: PagesTestIds.MAIN,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.LOGIN,
    testId: PagesTestIds.LOGIN,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.PRODUCT,
    testId: PagesTestIds.PRODUCT,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.REGISTRATION,
    testId: PagesTestIds.REGISTRATION,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.ABOUT,
    testId: PagesTestIds.ABOUT,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.PROFILE,
    testId: PagesTestIds.PROFILE,
    needAuth: true,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.BASKET,
    testId: PagesTestIds.BASKET,
    needAuth: true,
  });
  routeIsRenderedByTestId({
    route: `/${(Math.random() + 1).toString(36).slice(7)}`,
    testName: 'error page on random path',
    testId: PagesTestIds.ERROR,
  });
});

describe('redirects to login from password protected routes', async () => {
  routeIsRenderedByTestId({
    route: RoutePaths.PROFILE,
    testId: PagesTestIds.LOGIN,
    needAuth: false,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.BASKET,
    testId: PagesTestIds.LOGIN,
    needAuth: false,
  });
});

describe('redirects to main logined user from anonymous routes', async () => {
  routeIsRenderedByTestId({
    route: RoutePaths.LOGIN,
    testId: PagesTestIds.MAIN,
    needAuth: true,
  });
  routeIsRenderedByTestId({
    route: RoutePaths.REGISTRATION,
    testId: PagesTestIds.MAIN,
    needAuth: true,
  });
});
