import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer/Footer';
import Header from '../../components/Header/Header';

const loading = <h1>Loading....</h1>;

const Layout: FC = function () {
  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={loading}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
