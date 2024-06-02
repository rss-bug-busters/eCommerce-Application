import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { lazy } from 'react';
import RoutePaths from '@utils/consts/RoutePaths';
import Loader from '@components/ui/Loader/Loader';

const ProtectedRoute = lazy(() => import('@hoc/ProtectedRoute'));
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
    element: <Layout fallback={<Loader />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePaths.MAIN,
        element: (
          <ProtectedRoute authorization="any">
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.ABOUT,
        element: (
          <ProtectedRoute authorization="any">
            <AboutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.PRODUCT,
        element: (
          <ProtectedRoute authorization="any">
            <ProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.LOGIN,
        element: (
          <ProtectedRoute authorization="anonymous">
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.REGISTRATION,
        element: (
          <ProtectedRoute authorization="anonymous">
            <RegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.BASKET,
        element: (
          <ProtectedRoute authorization="password">
            <BasketPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.PROFILE,
        element: (
          <ProtectedRoute authorization="password">
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
