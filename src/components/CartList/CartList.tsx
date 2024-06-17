import { FC, useState } from 'react';
import { useCart } from '@hooks/cart';
import Spinner from '@assets/svg/spinner.svg?react';
import Clear from '@assets/svg/clear-all.svg?react';
import clsx from 'clsx';
import { useRemoveItemHandler } from '@hooks/cart/useRemoveItemHandler';
import { useQueryClient } from '@tanstack/react-query';
import QueryKeys from '@utils/consts/QueryKeys';
import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import CartItem from './CartItem/CartItem';

const CartList: FC = function () {
  const [isClearing, setIsClearing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isError, error, isPending } = useCart();
  const cart = data?.body;
  const { removeCartItemHandler } = useRemoveItemHandler();
  const items = cart?.lineItems ?? [];

  if (isError || !cart) {
    return (
      <div className="component-box">
        <h2>{error?.message}</h2>
      </div>
    );
  }

  const removeItemRecursive = async (currentItems: LineItem[], cartVersion: number) => {
    if (currentItems.length > 0 && currentItems[0]) {
      const item = currentItems[0];

      await removeCartItemHandler({ item, cartVersion });
      const updatedCart = await queryClient.fetchQuery<ClientResponse<Cart>>({
        queryKey: [QueryKeys.CART],
      });

      await removeItemRecursive(
        updatedCart?.body.lineItems ?? [],
        updatedCart?.body.version ?? cartVersion
      );
    }
  };

  const clearCartHandler = async () => {
    setIsClearing(true);
    await removeItemRecursive(items, cart.version);
    setIsClearing(false);
  };

  // useEffect(() => {
  //   console.log(cart.data?.body);
  // }, [cart, cart.data]);

  return (
    <div className="component-box">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-300 dark:border-zinc-600">
            <th className="">
              <span className="sr-only">Remove</span>
            </th>
            <th className="">
              <span className="sr-only">Image</span>
            </th>
            <th className="cell text-xl">Product</th>
            <th className="cell text-xl">Price</th>
            <th className="cell text-xl">Quantity</th>
            <th className="cell text-xl">Total</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr className="h-20">
              <td colSpan={6} className="">
                <span className="sr-only">Loading</span>
                <Spinner className="mx-auto h-8 w-8 animate-spin" />
              </td>
            </tr>
          ) : (
            <>
              {items.map((item) => (
                <CartItem key={item.productId} item={item} cart={cart} />
              ))}
            </>
          )}
        </tbody>
      </table>
      <button
        type="button"
        className={clsx(
          'mt-4 flex items-center gap-2 rounded-lg bg-zinc-300 p-2 text-xl font-semibold',
          'shadow-md shadow-zinc-600',
          'hover:translate-y-0.5 hover:bg-zinc-200 hover:transition-all',
          'dark:bg-zinc-600 dark:text-zinc-100 dark:shadow-zinc-400 dark:hover:bg-zinc-700'
        )}
        onClick={() => clearCartHandler()}
      >
        <span>Clear Shopping Cart</span>
        <Clear className={clsx('an h-6 w-6', { 'animate-spin': isClearing })} />
      </button>
    </div>
  );
};

export default CartList;
