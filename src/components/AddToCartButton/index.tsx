import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import Spinner from '@assets/svg/spinner.svg?react';
import { useCart, useRemoveItemMutation, useUpdateItemMutation } from '@hooks/cart';

interface AddToCartButtonProperties {
  product: ProductProjection;
}

function AddToCartButton({ product }: AddToCartButtonProperties) {
  const { t } = useTranslation();
  const { data, isSuccess } = useCart();
  const addItemMutation = useUpdateItemMutation();
  const removeItemMutation = useRemoveItemMutation();
  const [disabled, setDisabled] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(true);

  const addToCartHandler = () => {
    const cart = data?.body;

    if (cart) {
      addItemMutation.mutate({
        action: 'addLineItem',
        cartId: cart.id,
        cartVersion: cart.version,
        productId: product.id,
        quantity: 1,
        variantId: product.masterVariant.id,
      });

      return;
    }

    throw new Error('Dont add to cart before cart is loaded');
  };

  const removeFromCartHandler = () => {
    const cart = data?.body;

    if (cart) {
      const item = data?.body.lineItems.find(
        (lineItem) => lineItem.productId === product.id
      );

      if (item) {
        removeItemMutation.mutate({
          cartId: cart.id,
          cartVersion: cart.version,
          quantity: item.quantity,
          lineItemId: item.id,
        });
      }

      setIsAddingToCart(true);

      return;
    }

    throw new Error('Dont add to cart before cart is loaded');
  };

  useEffect(() => {
    if (!isSuccess || addItemMutation.isPending || removeItemMutation.isPending) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isSuccess, addItemMutation.isPending, removeItemMutation.isPending]);

  useEffect(() => {
    const item = data?.body.lineItems.find(
      (lineItem) => lineItem.productId === product.id
    );

    if (item) {
      setIsAddingToCart(false);
    }
  }, [data, product.id]);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();

        if (isAddingToCart) {
          addToCartHandler();
        } else {
          removeFromCartHandler();
        }
      }}
      className={clsx('btn btn-primary w-fit text-sm font-medium')}
      disabled={disabled}
    >
      <span className="flex items-center">
        {(addItemMutation.isPending || removeItemMutation.isPending) && (
          <Spinner className="mr-4 h-3 w-3 animate-spin" />
        )}
        {isAddingToCart ? t('item_card.add_to_cart') : t('item_card.remove_from_cart')}
      </span>
    </button>
  );
}

export default AddToCartButton;
