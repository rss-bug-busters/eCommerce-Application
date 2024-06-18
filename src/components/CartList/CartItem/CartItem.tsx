import { ChangeEvent, FC, useState } from 'react';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { useTranslation } from 'react-i18next';
import Trash from '@assets/svg/trash.svg?react';
import { useRemoveItemHandler } from '@hooks/cart/useRemoveItemHandler';
import Spinner from '@assets/svg/spinner.svg?react';
import { useUpdateItemMutation } from '@hooks/cart';
import styles from './cartItem.module.css';

interface CartItemProperties {
  cart: Cart;
  item: LineItem;
}

const CartItem: FC<CartItemProperties> = function ({ item, cart }) {
  const { i18n } = useTranslation();
  const { removeCartItemHandler, isPending } = useRemoveItemHandler();
  const updateItemMutation = useUpdateItemMutation();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const { price, totalPrice } = item;
  // const discount = discountedPricePerQuantity.reduce(
  //   (acc, curr) => {
  //     return {
  //       value: acc.value + curr.discountedPrice.includedDiscounts,
  //       formatted: acc.formatted + curr.discountedPrice.formatted,
  //       percentage: acc.percentage + curr.discountedPrice.percentage,
  //     };
  //   },
  //   { value: 0, formatted: '', percentage: 0 }
  // );
  const priceFormatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: price?.value.currencyCode,
  });

  const priceValue = price.value.centAmount / 10 ** price.value.fractionDigits;
  const priceFormatted: string = priceFormatter.format(priceValue);
  const isDiscounted: boolean = price.discounted !== undefined;
  const discount = {
    value: 0,
    formatted: '',
    percentage: 0,
  };

  if (price.discounted) {
    discount.value =
      price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits;
    discount.formatted = price?.discounted && priceFormatter.format(discount.value);
    discount.percentage = Math.round((1 - priceValue / discount.value) * 100);
  }

  const totalPriceFormatted: string = priceFormatter.format(
    totalPrice.centAmount / 10 ** totalPrice.fractionDigits
  );
  const updateItemQuantity = (value: number) => {
    setQuantity(value);
    updateItemMutation.mutate({
      action: 'changeLineItemQuantity',
      cartId: cart.id,
      cartVersion: cart.version,
      lineItemId: item.id,
      quantity: value,
      variantId: item.variant.id,
    });
  };
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      updateItemQuantity(quantity - 1);
    }
  };
  const increaseQuantityHandler = () => {
    updateItemQuantity(quantity + 1);
  };

  const changeQuantityHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityValue = Number.parseInt(event.target.value, 10);

    if (
      !Number.isNaN(quantityValue) &&
      quantityValue !== quantity &&
      quantityValue >= 1
    ) {
      updateItemQuantity(quantityValue);
    }
  };

  return (
    <tr className="border-b border-zinc-300 dark:border-zinc-600">
      <td className="cell">
        <button
          type="button"
          className=""
          onClick={() => removeCartItemHandler({ item })}
        >
          <span className="sr-only">Remove</span>
          {isPending ? (
            <Spinner className="h-6 w-6 animate-spin" />
          ) : (
            <Trash className="h-6 w-6 dark:text-zinc-200" />
          )}
        </button>
      </td>
      <td className="cell h-20 w-20">
        <img
          src={item.variant.images?.[0]?.url}
          alt={item.name[i18n.language] ?? ''}
          className=" h-full w-full rounded-md object-cover"
        />
      </td>
      <td className="cell">
        <span className="flex items-center">{item.name[i18n.language] ?? ''}</span>
      </td>
      <td className="cell">
        <span className="text-lg font-semibold">
          {isDiscounted ? discount.formatted : priceFormatted}
        </span>
      </td>
      <td className="cell">
        <div className="relative h-12 w-20 rounded-full border-2">
          {updateItemMutation.isPending && (
            <span className="absolute -left-2 -top-2">
              <Spinner className="h-4 w-4 animate-spin" />
            </span>
          )}
          <button
            type="button"
            className="absolute -top-1 h-12 px-2 text-2xl font-semibold"
            onClick={() => decreaseQuantityHandler()}
            disabled={updateItemMutation.isPending}
          >
            <span className="">-</span>
          </button>
          <button
            type="button"
            className="absolute -top-1 right-0 h-12 px-2 text-lg font-semibold"
            onClick={() => increaseQuantityHandler()}
            disabled={updateItemMutation.isPending}
          >
            <span className="">+</span>
          </button>
          <input
            name="quantity"
            type="number"
            className={`h-full w-20 bg-transparent text-center text-xl outline-none ${styles.withoutArrows}`}
            min={1}
            value={quantity}
            onChange={changeQuantityHandler}
            disabled={updateItemMutation.isPending}
          />
        </div>
      </td>
      <td className="cell">
        <span className="text-lg font-semibold">{totalPriceFormatted}</span>
      </td>
    </tr>
  );
};

export default CartItem;
