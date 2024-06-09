import About from '@components/About/about';
import { FC } from 'react';

const AboutPage: FC = function () {
  return (
    <div data-testid="about-page">
      <h1>AboutUs</h1>
      <About />
    </div>
  );
};

export default AboutPage;
