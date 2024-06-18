import { FC } from 'react';
import { useCart } from '@hooks/cart';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const CartTotals: FC = function () {
  const { data } = useCart();
  const { i18n } = useTranslation();
  const cart = data?.body;

  if (!cart) {
    return (
      <div className="component-box">
        <h2>Cart not loaded</h2>
      </div>
    );
  }

  const total = cart.totalPrice ?? {};
  const totalValue = total.centAmount / 10 ** total.fractionDigits;

  const priceFormatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: total.currencyCode,
  });
  const totalFormatted = priceFormatter.format(totalValue);

  const discount =
    cart.lineItems.reduce((accumulator, current) => {
      const { quantity, discountedPricePerQuantity } = current;
      const discounted =
        discountedPricePerQuantity?.[0]?.discountedPrice.includedDiscounts[0]
          ?.discountedAmount.centAmount ?? 0;

      return accumulator + discounted * quantity;
    }, 0) /
    10 ** total.fractionDigits;

  const discountFormatted = priceFormatter.format(discount);
  const subtotal = totalValue + discount;
  const subtotalFormatted = priceFormatter.format(subtotal);

  return (
    <div className="component-box">
      <div className="flex justify-between border-b border-zinc-300 p-2 dark:border-zinc-600">
        <h2 className="text-lg font-bold">Cart Totals</h2>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Subtotal</span>
        <span className="text-lg font-semibold">{subtotalFormatted}</span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total Discount</span>
        <span className="text-lg font-semibold">
          {discount > 0 ? `-${discountFormatted}` : '—'}
        </span>
      </div>
      <div className="flex justify-between p-2">
        <span className="text-lg">Total</span>
        <span className="text-lg font-semibold">{totalFormatted}</span>
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
