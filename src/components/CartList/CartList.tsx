import { FC } from 'react';
import { useCart } from '@hooks/cart';
import CartItem from './CartItem/CartItem';

const CartList: FC = function () {
  const cart = useCart();
  const items = cart.data?.body.lineItems ?? [];

  // useEffect(() => {
  //   console.log(cart.data?.body);
  // }, [cart, cart.data]);

  return (
    <div className="component-box">
      <table className="w-full">
        <thead>
          <tr>
            <th className="">
              <span className="sr-only">Remove</span>
            </th>
            <th className="">
              <span className="sr-only">Image</span>
            </th>
            <th className="cell">Product</th>
            <th className="cell">Price</th>
            <th className="cell">Quantity</th>
            <th className="cell">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
