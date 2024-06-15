import { FC } from 'react';
import { useCart } from '@hooks/cart';

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
      <div className="flex justify-between p-2">
        <h2 className="text-lg font-bold">Cart Totals</h2>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Subtotal</span>
        <span className="text-lg font-semibold">${cartTotals.subtotal}</span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total Discount</span>
        <span className="text-lg font-semibold">${cartTotals.discount}</span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total</span>
        <span className="text-lg font-semibold">${cartTotals.total}</span>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-zinc-900 p-2 text-white hover:bg-zinc-600 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotals;
