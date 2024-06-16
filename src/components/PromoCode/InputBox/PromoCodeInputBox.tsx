import { useCart } from '@hooks/cart';
import { useApplyPromoCode } from '@hooks/cart/useApplyPromoCode';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
  promoCode: string;
}

const PromoCodeInputBox: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
      <form onSubmit={handleSubmit(applyPromoCodeHandler)} className="flex ">
        <div className="relative">
          <input
            {...register('promoCode', { required: 'PromoCode is required' })}
            placeholder="PromoCode"
            className="w-max border-b-2"
          />
          {errors.promoCode && (
            <span className="absolute left-0 top-8 w-max border-b-2 border-white text-xs text-red-600">
              {errors.promoCode.message}
            </span>
          )}
        </div>

        <button type="submit" className=" w-max border-b-2 font-semibold text-gray-400">
          Apply
        </button>
      </form>
    </div>
  );
};

export default PromoCodeInputBox;
