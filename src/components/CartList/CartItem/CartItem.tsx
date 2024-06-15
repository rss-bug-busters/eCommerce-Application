import { FC, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { useTranslation } from 'react-i18next';
import Trash from '@assets/svg/trash.svg?react';
import { useRemoveItemHandler } from '@hooks/cart/useRemoveItemHandler';
import Spinner from '@assets/svg/spinner.svg?react';
import styles from './cartItem.module.css';

interface CartItemProperties {
  item: LineItem;
}

const CartItem: FC<CartItemProperties> = function ({ item }) {
  const { i18n } = useTranslation();
  const { removeItemHandler, isPending } = useRemoveItemHandler();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantityHandler = () => {
    setQuantity(quantity + 1);
  };

  return (
    <tr className="border-b">
      <td className="cell">
        <button
          type="button"
          className=""
          onClick={() => removeItemHandler({ id: item.productId })}
        >
          <span className="sr-only">Remove</span>
          {isPending ? (
            <Spinner className="h-6 w-6 animate-spin" />
          ) : (
            <Trash className="h-6 w-6 dark:text-zinc-200" />
          )}
        </button>
      </td>
      <td className="cell">
        <img
          src={item.variant.images?.[0]?.url}
          alt={item.name[i18n.language] ?? ''}
          className="h-16 w-16 object-cover"
        />
      </td>
      <td className="cell">
        <span className="flex items-center">{item.name[i18n.language] ?? ''}</span>
      </td>
      <td className="cell">
        <span className="text-lg font-semibold">
          {item.price.value.centAmount / 100}$
        </span>
      </td>
      <td className="cell">
        <div className="relative h-12 w-20 rounded-full border-2">
          <button
            type="button"
            className="absolute -top-1 h-12 px-2 text-2xl font-semibold"
            onClick={() => decreaseQuantityHandler()}
          >
            <span className="">-</span>
          </button>
          <button
            type="button"
            className="absolute -top-1 right-0 h-12 px-2 text-lg font-semibold"
            onClick={() => increaseQuantityHandler()}
          >
            <span className="">+</span>
          </button>
          <input
            // name="quantity"
            type="number"
            className={`h-full w-20 bg-transparent text-center outline-none ${styles.withoutArrows}`}
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            onBlur={(event) => setQuantity(Number(event.target.value))}
          />
        </div>
      </td>
      <td className="cell">
        <span className="">{(item.price.value.centAmount / 100) * item.quantity}$</span>
      </td>
    </tr>
  );
};

export default CartItem;
