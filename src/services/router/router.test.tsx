import { describe } from 'vitest';
import RoutePaths from '@utils/consts/RoutePaths';
import routeIsRenderedByTestId from '@tests/untils/routeIsRenderedByTestId';

describe('all routes rendered', async () => {
  routeIsRenderedByTestId({
    route: RoutePaths.MAIN,
    testName: 'main page',
    testId: 'main-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.BASKET,
    testName: 'basket page',
    testId: 'basket-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.LOGIN,
    testName: 'login page',
    testId: 'login-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.PRODUCT,
    testName: 'product page',
    testId: 'product-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.PROFILE,
    testName: 'profile page',
    testId: 'profile-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.REGISTRATION,
    testName: 'registration page',
    testId: 'registration-page',
  });
  routeIsRenderedByTestId({
    route: RoutePaths.ABOUT,
    testName: 'about page',
    testId: 'about-page',
  });
  routeIsRenderedByTestId({
    route: `/${(Math.random() + 1).toString(36).slice(7)}`,
    testName: 'error page on random path',
    testId: 'error-page',
  });
});
