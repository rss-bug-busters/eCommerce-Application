import { FC, ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer/Footer';
import Header from '../../components/Header/Header';

interface LayoutProperties {
  children?: ReactNode;
  fallback: ReactNode;
}

const Layout: FC<LayoutProperties> = function ({ fallback, children }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-8 dark:bg-stone-900/90 dark:text-white/75">
      <Header />
      <main>
        <Suspense fallback={fallback}>{children ?? <Outlet />}</Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
