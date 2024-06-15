import { useCart, useRemoveItemMutation } from '@hooks/cart';
import RemoveItemArguments from '@hooks/cart/useRemoveItemHandler/types/RemoveItemArguments';

const useRemoveItemHandler = () => {
  const { data } = useCart();
  const cart = data?.body;
  const { mutate: removeItemMutation, isPending } = useRemoveItemMutation();

  const removeItemHandler = ({ callback, id }: RemoveItemArguments) => {
    if (cart) {
      const item = cart.lineItems.find((lineItem) => lineItem.productId === id);

      if (item) {
        removeItemMutation({
          cartId: cart.id,
          cartVersion: cart.version,
          quantity: item.quantity,
          lineItemId: item.id,
        });
      }

      if (callback) {
        callback();
      }

      return;
    }

    throw new Error('Dont add to cart before cart is loaded');
  };

  return {
    removeItemHandler,
    isPending,
  };
};

export default useRemoveItemHandler;
