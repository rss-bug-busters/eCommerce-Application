import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import routePaths from '@utils/consts/RoutePaths';

interface Properties {
  key?: string | number;
  location?: string;
  priceCountry?: string;
  product: ProductProjection;
}

function ItemCard({ product, location = 'en-US', priceCountry = 'US' }: Properties) {
  const { name, description, masterVariant, id, key } = product;
  const price = masterVariant.prices?.find((item) => item.country === priceCountry);

  const priceFormatter = new Intl.NumberFormat(location, {
    style: 'currency',
    currency: price?.value.currencyCode ?? 'USD',
  });

  const priceValue: undefined | string =
    price &&
    priceFormatter.format(price.value.centAmount / 10 ** price.value.fractionDigits);

  const discountValue: undefined | string =
    price?.discounted &&
    priceFormatter.format(
      price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits
    );

  const descriptionValue: string = description?.[location] ?? '';

  const nameValue = name[location] ?? '';

  const productLink = routePaths.PRODUCT.replace(':id', `${id}`);

  return (
    <Link to={productLink}>
      <div
        className="grid grid-rows-[1fr_auto_auto] w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-gray-700"
        key={key ?? id}
      >
        <img
          className="p-8 w-full h-full rounded-t-lg"
          src={masterVariant.images?.[0]?.url ?? ''}
          alt="product"
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
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
