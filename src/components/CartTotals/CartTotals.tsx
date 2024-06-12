import { FC } from 'react';

const CartTotals: FC = function () {
  // const { data: cartTotals, isLoading } = useQuery('cartTotals', getCartTotals);

  // if (isLoading) return <p>Loading...</p>;

  const cartTotals = {
    subtotal: 0,
    tax: 0,
    total: 0,
  };

  return (
    <div className="  mt-4 rounded-lg p-4 shadow-md">
      <div className="flex justify-between p-2">
        <span className="text-lg">Subtotal</span>
        <span className="text-lg font-semibold">${cartTotals.subtotal}</span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Tax</span>
        <span className="text-lg font-semibold">${cartTotals.tax}</span>
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
