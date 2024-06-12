import { FC } from 'react';
import CartItem from './CartItem/CartItem';

const CartList: FC = function () {
  const items = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://via.placeholder.com/150',
      price: 100,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://via.placeholder.com/150',
      price: 200,
      quantity: 1,
    },
  ];

  const CartItems = () =>
    items.map((item) => (
      <CartItem
        key={item.id}
        item={{
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        }}
      />
    ));

  return (
    <div className="rounded-lg p-4 shadow-md ">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Image</th>
            <th className="text-left">Product</th>
            <th className="text-right">Price</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <CartItems />
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
