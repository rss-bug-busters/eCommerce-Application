import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  promoCode: string;
}
const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

const PromoCodeInputBox: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex ">
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
