import { FC } from 'react';
import RoutePaths from '@utils/consts/RoutePaths';
import { Link } from 'react-router-dom';
import Cart from '@assets/svg/cart.svg?react';
import { useCart } from '@hooks/cart';
import clsx from 'clsx';

const BasketLink: FC = function () {
  const { data } = useCart();
  const quantity = data?.body.totalLineItemQuantity;

  return (
    <Link to={RoutePaths.CART}>
      <span className="relative">
        <span className="sr-only">Basket</span>
        <Cart className="h-7 w-7" />
        {quantity && (
          <span
            className={clsx(
              'absolute -bottom-2 -right-2 text-lg font-bold',
              'flex h-5 w-5 items-center justify-center rounded-full bg-cyan-200 shadow-md shadow-cyan-900',
              'dark:bg-cyan-900 dark:text-white dark:shadow-cyan-200'
            )}
          >
            {quantity}
          </span>
        )}
      </span>
    </Link>
  );
};

export default BasketLink;
