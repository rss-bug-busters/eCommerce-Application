import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer/Footer';
import Header from '../../components/Header/Header';

interface LayoutProperties {
  fallback: ReactNode;
}

const Layout = function ({ fallback }: LayoutProperties) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-8 dark:bg-stone-900/90 dark:text-white/75">
      <Header />
      <main>
        <Suspense fallback={fallback}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
