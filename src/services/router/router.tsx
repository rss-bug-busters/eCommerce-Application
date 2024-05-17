import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { lazy } from 'react';
import RoutePaths from '@utils/consts/RoutePaths';
import NeedAuth from '@hook/NeedAuth';

const Layout = lazy(() => import('@pages/Layout/Layout'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const BasketPage = lazy(() => import('@pages/BasketPage/BasketPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const ProductPage = lazy(() => import('@pages/ProductPage/ProductPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const RegistrationPage = lazy(() => import('@pages/RegistrationPage/RegistrationPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage/ErrorPage'));

const loading = <h1>Loading....</h1>;

const routes: RouteObject[] = [
  {
    path: RoutePaths.MAIN,
    element: <Layout fallback={loading} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePaths.MAIN,
        element: <MainPage />,
      },
      {
        path: RoutePaths.BASKET,
        element: (
          <NeedAuth fallback={loading}>
            <BasketPage />
          </NeedAuth>
        ),
      },
      {
        path: RoutePaths.LOGIN,
        element: (
          <NeedAuth authType="anonymous" fallback={loading}>
            <LoginPage />
          </NeedAuth>
        ),
      },
      {
        path: RoutePaths.PRODUCT,
        element: (
          <NeedAuth fallback={loading}>
            <ProductPage />
          </NeedAuth>
        ),
      },
      {
        path: RoutePaths.PROFILE,
        element: (
          <NeedAuth fallback={loading}>
            <ProfilePage />
          </NeedAuth>
        ),
      },
      {
        path: RoutePaths.REGISTRATION,
        element: (
          <NeedAuth authType="anonymous" fallback={loading}>
            <RegistrationPage />
          </NeedAuth>
        ),
      },
      {
        path: RoutePaths.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
