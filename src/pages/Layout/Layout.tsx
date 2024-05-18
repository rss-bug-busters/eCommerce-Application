import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer/Footer';
import Header from '../../components/Header/Header';

interface LayoutProperties {
  fallback: ReactNode;
}

const Layout = function ({ fallback }: LayoutProperties) {
  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={fallback}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
