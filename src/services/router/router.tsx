import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { lazy } from 'react';
import RoutePaths from '@utils/consts/RoutePaths';

const ProtectedRoute = lazy(() => import('@hook/ProtectedRoute'));
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
        path: RoutePaths.ABOUT,
        element: <AboutPage />,
      },
      {
        path: RoutePaths.PRODUCT,
        element: <ProductPage />,
      },
      {
        path: RoutePaths.LOGIN,
        element: (
          <ProtectedRoute authorization="anonymous" fallback={loading}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.REGISTRATION,
        element: (
          <ProtectedRoute authorization="anonymous" fallback={loading}>
            <RegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.BASKET,
        element: (
          <ProtectedRoute authorization="password" fallback={loading}>
            <BasketPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePaths.PROFILE,
        element: (
          <ProtectedRoute authorization="password" fallback={loading}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
