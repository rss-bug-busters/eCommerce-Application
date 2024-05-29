import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import routePaths from '@utils/consts/RoutePaths';
import { useTranslation } from 'react-i18next';

interface Properties {
  key?: string | number;
  product: ProductProjection;
}

function ItemCard({ product }: Properties) {
  const { name, description, masterVariant, id, key } = product;
  const { price, images } = masterVariant;
  const { i18n, t } = useTranslation();

  const priceFormatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: price?.value.currencyCode,
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
        className="grid grid-rows-[1fr_auto_auto] w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-gray-700"
        key={key ?? id}
      >
        <img
          className="p-8 w-full  h-full rounded-t-lg"
          src={images?.[0]?.url ?? ''}
          alt={t('item_card.img_alt')}
        />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {nameValue}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <p className="text-gray-500 dark:text-gray-400">
              {`${descriptionValue.slice(0, 97)}...`}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`font-bold text-gray-900 dark:text-white ${discountValue ? 'line-through' : 'text-2xl'}`}
              >
                {priceValue ?? ''}
              </p>
              {discountValue && (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {discountValue ?? ''}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                console.log(`Add to cart ${id}`);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t('item_card.add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
