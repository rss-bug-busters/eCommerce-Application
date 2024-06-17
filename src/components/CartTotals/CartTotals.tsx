import { FC } from 'react';
import { useCart } from '@hooks/cart';
import clsx from 'clsx';

const CartTotals: FC = function () {
  const cart = useCart();
  const discount =
    (cart.data?.body.discountOnTotalPrice?.discountedAmount.centAmount ?? 0) / 100;
  const total = (cart.data?.body.totalPrice.centAmount ?? 0) / 100;
  const cartTotals = {
    subtotal: (cart.data?.body.totalPrice.centAmount ?? 0) / 100 + discount,
    discount,
    total,
  };

  return (
    <div className="component-box">
      <div className="flex justify-between border-b border-zinc-300 p-2 dark:border-zinc-600">
        <h2 className="text-lg font-bold">Cart Totals</h2>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Subtotal</span>
        <span className="text-lg font-semibold">{cartTotals.subtotal.toFixed(2)}$</span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total Discount</span>
        <span className="text-lg font-semibold">
          {cartTotals.discount > 0 ? `-${cartTotals.discount.toFixed(2)}$` : '—'}
        </span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total</span>
        <span className="text-lg font-semibold">{cartTotals.total.toFixed(2)}$</span>
      </div>
      <button
        type="button"
        className={clsx(
          'mt-4 w-full rounded-lg bg-zinc-800 p-2 text-xl font-bold text-white',
          'shadow-md shadow-zinc-600',
          'hover:bg-zinc-700',
          'dark:bg-zinc-200 dark:text-zinc-900 dark:shadow-zinc-400 dark:hover:bg-zinc-300'
        )}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotals;
