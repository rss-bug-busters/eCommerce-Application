import { FC } from 'react';
import FooterText from '@components/Footer/components/FooterText';
import LinkList from '@components/Footer/components/LinkList';
import Home from '@assets/svg/home.svg?react';
import Mail from '@assets/svg/mail.svg?react';
import Phone from '@assets/svg/phone.svg?react';
import RoutePaths from '@utils/consts/RoutePaths';

const Footer: FC = function () {
  return (
    <footer className="text-center text-surface/75 dark:bg-black/90 dark:text-white/75 lg:text-left">
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
              { link: '#', name: 'Orders' },
              { link: '#', name: 'Help' },
            ]}
          />
          <LinkList
            title="Contact"
            links={[
              {
                link: '#!',
                name: 'Moscow Borovickya 1 ',
                svg: <Home />,
              },
              {
                link: '#',
                name: 'mail@mail.com',
                svg: <Mail />,
              },
              {
                link: '#',
                name: '+1234567890',
                svg: <Phone />,
              },
            ]}
          />
        </div>
      </div>
      <div className="bg-black p-6 text-center">
        <span>© {new Date().getFullYear()} Copyright: </span>
        <a className="font-semibold" href="https://github.com/rss-bug-busters/">
          rss-bug-busters
        </a>
      </div>
    </footer>
  );
};

export default Footer;
