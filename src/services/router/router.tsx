import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@pages/MainPage/MainPage';
import Layout from '@pages/Layout/Layout';
import BasketPage from '@pages/BasketPage/BasketPage';
import AboutPage from '@pages/AboutPage/AboutPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import ProductPage from '@pages/ProductPage/ProductPage';
import ProfilePage from '@pages/ProfilePage/ProfilePage';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import RoutePaths from '@utils/consts/RoutePaths';

const router = createBrowserRouter([
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
]);

export default router;
