import { FC } from 'react';

interface CartItemProperties {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  };
}

const CartItem: FC<CartItemProperties> = function ({ item }) {
  return (
    <tr className="">
      <td className="text-left">
        <button type="button" className="rounded-lg bg-red-600 p-1 text-white">
          <span className="sr-only">Remove</span>
        </button>
      </td>
      <td className="text-left">
        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
      </td>
      <td className="text-left">
        <span className="flex items-center">{item.name}</span>
      </td>
      <td className="text-right">
        <span className="text-lg font-semibold">${item.price}</span>
      </td>
      <td className="text-right">
        <span className="">{item.quantity}</span>
      </td>
      <td className="text-right">
        <span className="">${item.price * item.quantity}</span>
      </td>
    </tr>
  );
};

export default CartItem;
