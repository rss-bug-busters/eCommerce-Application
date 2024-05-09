import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const loading = <h1>Loading....</h1>;

const Layout: FC = function () {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={loading}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
