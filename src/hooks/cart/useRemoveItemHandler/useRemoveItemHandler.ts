import { useCart, useRemoveItemMutation } from '@hooks/cart';
import RemoveItemArguments from '@hooks/cart/useRemoveItemHandler/types/RemoveItemArguments';

const useRemoveItemHandler = () => {
  const { data } = useCart();
  const cart = data?.body;
  const { mutateAsync: removeItemMutation, isPending } = useRemoveItemMutation();

  const removeCartItemHandler = async ({
    callback,
    item,
    cartVersion,
  }: RemoveItemArguments) => {
    if (cart) {
      await removeItemMutation({
        cartId: cart.id,
        cartVersion: cartVersion ?? cart.version,
        quantity: item.quantity,
        lineItemId: item.id,
      });

      if (callback) {
        callback();
      }

      return;
    }

    throw new Error('Dont add to cart before cart is loaded');
  };

  return {
    removeCartItemHandler,
    isPending,
  };
};

export default useRemoveItemHandler;
