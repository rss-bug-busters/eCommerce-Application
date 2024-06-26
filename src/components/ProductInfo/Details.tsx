import { ProductProjection } from '@commercetools/platform-sdk';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AddToCartButton from '@components/AddToCartButton';
import usePriceFormatter from '@hooks/usePriceFormatter';

interface Properties {
  className?: string;
  product: ProductProjection;
}
const ProductInfo: FC<Properties> = function ({ product, className }) {
  const { name, description, masterVariant } = product;
  const { prices } = masterVariant;
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const country = 'US';

  const chosenPrice = prices?.find((price) => price.country === country) ?? prices?.[0];
  const { priceFormatted, isDiscounted, discount } = usePriceFormatter(chosenPrice);

  if (!chosenPrice) {
    return (
      <div className={`${className ?? ''} flex flex-col justify-center gap-4`}>
        <h1 className="text-3xl font-bold">{name[lang]}</h1>
        <span className="text-xl text-red-600">No price found for specified country</span>
        <p className="text-xl">{description?.[lang] ?? 'No description available'}</p>
      </div>
    );
  }

  return (
    <div className={`${className ?? ''} flex flex-col justify-center gap-4`}>
      <h1 className="text-3xl font-bold">{name[lang]}</h1>
      <div className="flex items-center gap-2">
        {isDiscounted && (
          <span className="text-2xl font-bold dark:text-white">{discount.formatted}</span>
        )}
        <span
          className={`text-xl font-bold ${isDiscounted ? 'text-zinc-400 line-through' : 'text-2xl dark:text-white'}`}
        >
          {priceFormatted}
        </span>
        {isDiscounted && (
          <span className="text-emerald-600">{discount.percentage}% off</span>
        )}
      </div>
      <p className="text-xl">{description?.[lang] ?? 'No description available'}</p>
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductInfo;
