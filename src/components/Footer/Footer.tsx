import { FC } from 'react';
import FooterText from '@components/Footer/components/FooterText';
import LinkList from '@components/Footer/components/LinkList';
import Home from '@assets/svg/home.svg?react';
import Mail from '@assets/svg/mail.svg?react';
import Phone from '@assets/svg/phone.svg?react';
import RoutePaths from '@utils/consts/RoutePaths';

const Footer: FC = function () {
  return (
    <footer className="bg-slate-50 text-center text-surface/75 dark:bg-stone-900 dark:text-white/75 lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left justify-items-center">
        <div className="md:grid-cols-2 lg:grid-cols-4 grid-1 grid gap-8">
          <FooterText />
          <LinkList
            title="For customers"
            links={[{ link: RoutePaths.ABOUT, name: 'About us' }]}
          />
          <LinkList
            title="Useful links"
            links={[
              { link: RoutePaths.PROFILE, name: 'Account' },
              { link: RoutePaths.PROFILE, name: 'Orders' },
              { link: 'mailto:mail@mail.com', name: 'Help' },
            ]}
          />
          <LinkList
            title="Contact"
            links={[
              {
                target: '_blank',
                link: 'https://www.google.by/maps/@-75.1004764,123.3314896,1725m/data=!3m1!1e3!5m1!1e4?entry=ttu',
                name: 'Concordia Station ',
                svg: <Home />,
              },
              {
                link: 'mailto:mail@mail.com',
                name: 'mail@mail.com',
                svg: <Mail />,
              },
              {
                link: 'tel:+1234567890',
                name: '+1234567890',
                svg: <Phone />,
              },
            ]}
          />
        </div>
      </div>
      <div className="bg-zinc-100 p-4 text-center dark:bg-stone-950/30">
        <span>© {new Date().getFullYear()} Copyright: </span>
        <a className="font-semibold" href="https://github.com/rss-bug-busters/">
          rss-bug-busters
        </a>
      </div>
    </footer>
  );
};

export default Footer;
