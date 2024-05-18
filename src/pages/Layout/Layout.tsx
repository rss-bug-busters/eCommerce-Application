import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface LayoutProperties {
  fallback: ReactNode;
}

const Layout = function ({ fallback }: LayoutProperties) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={fallback}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
