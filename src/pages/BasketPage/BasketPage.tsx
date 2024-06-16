import CartList from '@components/CartList/CartList';
import CartTotals from '@components/CartTotals/CartTotals';
import PromoCodesBox from '@components/PromoCode/displayPromoCode/displayPromoCode';
import { FC } from 'react';

const BasketPage: FC = function () {
  return (
    <div data-testid="basket-page" className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">Your Cart</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="mb-4 md:col-span-8">
          <CartList />
        </div>
        <div className="mb-4 md:col-span-4">
          <CartTotals />
        </div>
        <PromoCodesBox />
      </div>
    </div>
  );
};

export default BasketPage;
