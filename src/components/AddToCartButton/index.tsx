import { useAddItemMutation, useCart, useRemoveItemMutation } from '@hooks/cart';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import Spinner from '@assets/svg/spinner.svg?react';

interface AddToCartButtonProperties {
  product: ProductProjection;
}

const findItem = (id: string, items?: LineItem[]): LineItem | undefined =>
  items?.find((item) => item.productId === id);

function AddToCartButton({
  product: {
    id: productId,
    masterVariant: { id: variantId },
  },
}: AddToCartButtonProperties) {
  const { t } = useTranslation();
  const { data: { body: cart } = {} } = useCart();
  const addItemMutation = useAddItemMutation();
  const removeItemMutation = useRemoveItemMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [cartItem, setCartItem] = useState<undefined | LineItem>();

  useEffect(
    () =>
      setIsButtonDisabled(
        !cart || addItemMutation.isPending || removeItemMutation.isPending
      ),
    [addItemMutation.isPending, removeItemMutation.isPending, cart]
  );

  useEffect(() => setCartItem(findItem(productId, cart?.lineItems)), [cart, productId]);

  const addToCartHandler = () => {
    if (cart) {
      addItemMutation.mutate({
        cartId: cart.id,
        cartVersion: cart.version,
        productId,
        quantity: 1,
        variantId,
      });

      return;
    }

    throw new Error('Dont add to cart before cart is loaded');
  };

  const removeFromCartHandler = () => {
    if (cartItem && cart) {
      removeItemMutation.mutate({
        cartId: cart.id,
        cartVersion: cart.version,
        quantity: cartItem.quantity,
        lineItemId: cartItem.id,
      });

      return;
    }

    throw new Error('Dont remove from cart before cart is loaded');
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();

        if (cartItem) {
          removeFromCartHandler();
        } else {
          addToCartHandler();
        }
      }}
      className={clsx(
        'rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white',
        'hover:bg-blue-800',
        'focus:outline-none focus:ring-4 focus:ring-blue-300',
        'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
      disabled={isButtonDisabled}
    >
      <div className="flex items-center">
        {isButtonDisabled && <Spinner className="mr-4 h-3 w-3 animate-spin" />}
        {cartItem ? t('item_card.remove_from_cart') : t('item_card.add_to_cart')}
      </div>
    </button>
  );
}

export default AddToCartButton;
