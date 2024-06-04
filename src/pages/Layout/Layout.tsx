import { FC, ReactNode, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '@components/Footer/Footer';
import Header from '../../components/Header/Header';

interface LayoutProperties {
  children?: ReactNode;
  fallback: ReactNode;
}

const Layout: FC<LayoutProperties> = function ({ fallback, children }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 dark:bg-zinc-900 dark:text-white/75">
      <Header />
      <main className="pl-3 pr-3">
        <Suspense fallback={fallback}>{children ?? <Outlet />}</Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
