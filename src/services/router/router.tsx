import { createBrowserRouter } from 'react-router-dom';

import { lazy, Suspense } from 'react';
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

const loader = <h1>Loading....</h1>;

const router = createBrowserRouter([
  {
    path: RoutePaths.MAIN,
    element: (
      <Suspense fallback={loader}>
        <Layout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePaths.MAIN,
        element: (
          <Suspense fallback={loader}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.BASKET,
        element: (
          <Suspense fallback={loader}>
            <BasketPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.LOGIN,
        element: (
          <Suspense fallback={loader}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.PRODUCT,
        element: (
          <Suspense fallback={loader}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.PROFILE,
        element: (
          <Suspense fallback={loader}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.REGISTRATION,
        element: (
          <Suspense fallback={loader}>
            <RegistrationPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.ABOUT,
        element: (
          <Suspense fallback={loader}>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
