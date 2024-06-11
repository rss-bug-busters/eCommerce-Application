import { FC } from 'react';
import About from '@components/About/about';

const AboutPage: FC = function () {
  return (
    <div data-testid="about-page">
      <h1>AboutUs</h1>
      <About />
    </div>
  );
};

export default AboutPage;
