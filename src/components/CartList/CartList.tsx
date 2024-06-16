import { FC } from 'react';
import { useCart } from '@hooks/cart';
import CartItem from './CartItem/CartItem';

const CartList: FC = function () {
  const cart = useCart();
  const items = cart.data?.body.lineItems ?? [];

  if (!cart.isSuccess) {
    return (
      <div className="component-box">
        <p>{cart.error?.message}</p>
      </div>
    );
  }

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
          {items.map((item) => (
            <CartItem key={item.productId} item={item} cart={cart.data?.body} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
