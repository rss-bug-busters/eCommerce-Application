import CartList from '@components/CartList/CartList';
import CartTotals from '@components/CartTotals/CartTotals';
import PromoCodesBox from '@components/PromoCode/PromoCodesBox/PromoCodesBox';
import { FC } from 'react';
import { useCart } from '@hooks/cart';
import { Link } from 'react-router-dom';
import RoutePaths from '@utils/consts/RoutePaths';

const CartPage: FC = function () {
  const { data } = useCart();
  const cart = data?.body;

  return (
    <div data-testid="cart-page" className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Your Cart
        {cart?.lineItems.length === 0 && (
          <span className="ml-2 text-cyan-900 dark:text-cyan-100">is empty</span>
        )}
      </h1>
      {cart?.lineItems.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="mb-4 md:col-span-8">
            <CartList />
          </div>
          <div className="md:col-span-4">
            <CartTotals />
          </div>
          <PromoCodesBox />
        </div>
      ) : (
        <div className="mt-10 text-center">
          <Link
            to={RoutePaths.CATALOG}
            className="btn btn-primary text-2xl font-semibold"
          >
            ← Go to catalog
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
