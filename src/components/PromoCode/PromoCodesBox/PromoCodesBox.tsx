import { useCart } from '@hooks/cart';
import { useApplyPromoCode } from '@hooks/cart/useApplyPromoCode';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
  promoCode: string;
}

const PromoCodesBox: FC = function () {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const promoCode = watch('promoCode');

  const { data } = useCart();
  const applyPromoCode = useApplyPromoCode();

  const applyPromoCodeHandler = (inputData: Inputs) => {
    const cart = data?.body;

    if (cart) {
      const cartId = cart.id;
      const cartVersion = cart.version;
      const action = 'addDiscountCode';

      applyPromoCode.mutate({
        action,
        cartId,
        cartVersion,
        code: inputData.promoCode,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(applyPromoCodeHandler)}
        className="flex items-center gap-3"
      >
        <div className="relative ">
          <input
            {...register('promoCode')}
            placeholder="Promo Code"
            className="w-max rounded-lg border-b-2 border-zinc-700 bg-transparent p-2 text-lg font-semibold outline-none dark:border-zinc-300"
          />
        </div>

        <button type="submit" className="btn btn-primary text-md" disabled={!promoCode}>
          Apply
        </button>
      </form>
    </div>
  );
};

export default PromoCodesBox;
