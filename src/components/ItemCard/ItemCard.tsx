import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import routePaths from '@utils/consts/RoutePaths';
import { useTranslation } from 'react-i18next';
import ProgressiveImage from '@components/ui/ProgressiveImage/ProgressiveImage';
import clsx from 'clsx';
import usePriceInfo from '@hooks/usePriceInfo.ts';
import AddToCartButton from '@components/AddToCartButton';

interface Properties {
  key?: string | number;
  product: ProductProjection;
}

function ItemCard({ product }: Properties) {
  const { name, description, masterVariant, id, key } = product;
  const { price, images } = masterVariant;
  const { i18n, t } = useTranslation();
  const { priceInfo } = usePriceInfo();

  const priceFormatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: price?.value.currencyCode ?? priceInfo.priceCurrency,
  });

  const priceValue: undefined | string =
    price &&
    priceFormatter.format(price.value.centAmount / 10 ** price.value.fractionDigits);

  const discountValue: undefined | string =
    price?.discounted &&
    priceFormatter.format(
      price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits
    );

  const descriptionValue: string = description?.[i18n.language] ?? '';

  const nameValue = name[i18n.language] ?? '';

  const productLink = routePaths.PRODUCT.replace(':id', `${id}`);

  return (
    <Link to={productLink} preventScrollReset={false}>
      <div
        className={clsx(
          'group/card grid h-full w-full max-w-sm grid-rows-[1fr_auto] gap-4 rounded-lg border border-gray-200 bg-white shadow',
          'hover:dark:bg-zinc-700',
          'dark:border-gray-700 dark:bg-zinc-800'
        )}
        key={key ?? id}
      >
        <div className="h-96 w-full overflow-hidden rounded-t-lg">
          <ProgressiveImage
            placeholder={
              <div
                className="h-96 w-96 animate-pulse cursor-wait self-center rounded-t-lg bg-gray-700"
                role="status"
              />
            }
            className={clsx(
              'h-full w-full rounded-t-lg object-fill transition-all duration-300',
              'group-hover/card:scale-110 group-hover/card:shadow-lg group-hover/card:shadow-gray-400'
            )}
            src={images?.[0]?.url ?? ''}
            alt={t('item_card.img_alt')}
          />
        </div>

        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {nameValue}
          </h5>
          <div className="mb-5 mt-2.5 flex items-center">
            <p className="text-gray-500 dark:text-gray-400">
              {`${descriptionValue.slice(0, 97)}...`}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative">
              <p
                className={clsx(
                  'font-bold text-gray-900 dark:text-white',
                  discountValue ? 'absolute -top-4 line-through' : 'text-2xl'
                )}
              >
                {priceValue ?? ''}
              </p>
              {discountValue && (
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {discountValue ?? ''}
                </span>
              )}
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
