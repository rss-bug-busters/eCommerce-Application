import { createHashRouter, RouteObject } from 'react-router-dom';

import { lazy } from 'react';
import RoutePaths from '@utils/consts/RoutePaths';

const Layout = lazy(() => import('@pages/Layout/Layout'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const BasketPage = lazy(() => import('@pages/BasketPage/BasketPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const ProductPage = lazy(() => import('@pages/ProductPage/ProductPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const RegistrationPage = lazy(() => import('@pages/RegistrationPage/RegistrationPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage/ErrorPage'));

const routes: RouteObject[] = [
  {
    path: RoutePaths.MAIN,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePaths.MAIN,
        element: <MainPage />,
      },
      {
        path: RoutePaths.BASKET,
        element: <BasketPage />,
      },
      {
        path: RoutePaths.LOGIN,
        element: <LoginPage />,
        action: 
      },
      {
        path: RoutePaths.PRODUCT,
        element: <ProductPage />,
      },
      {
        path: RoutePaths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: RoutePaths.REGISTRATION,
        element: <RegistrationPage />,
      },
      {
        path: RoutePaths.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
];

const hashRouter = createHashRouter(routes);

export { hashRouter, routes };
