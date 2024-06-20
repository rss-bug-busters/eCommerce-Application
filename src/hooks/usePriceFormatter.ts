import { Price } from '@commercetools/platform-sdk';
import { useTranslation } from 'react-i18next';
import usePriceInfo from '@hooks/usePriceInfo';

const usePriceFormatter = (price?: Price) => {
  const { i18n } = useTranslation();
  const { priceInfo } = usePriceInfo();

  const priceFormatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: price?.value.currencyCode ?? priceInfo.priceCurrency,
  });
  const discount = {
    value: 0,
    formatted: '',
    percentage: 0,
  };

  if (!price) {
    return {
      priceFormatter,
      priceFormatted: '',
      isDiscounted: false,
      discount,
    };
  }

  const priceValue = price.value.centAmount / 10 ** price.value.fractionDigits;
  const priceFormatted: string = priceFormatter.format(priceValue);
  const isDiscounted: boolean = price.discounted !== undefined;

  if (price.discounted) {
    discount.value =
      price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits;
    discount.formatted = price?.discounted && priceFormatter.format(discount.value);
    discount.percentage = Math.round((1 - priceValue / discount.value) * 100);
  }

  return { priceFormatter, priceFormatted, isDiscounted, discount };
};

export default usePriceFormatter;
