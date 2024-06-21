import { FC } from 'react';
import Spinner from '@assets/svg/spinner.svg?react';

const Loader: FC = function () {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
