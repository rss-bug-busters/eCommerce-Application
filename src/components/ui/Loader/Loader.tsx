import { FC } from 'react';
import Spinner from '@assets/svg/spinner.svg?react';

const Loader: FC = function () {
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
