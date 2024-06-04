import { useTranslation } from 'react-i18next';

interface PriceInfo {
  fractionDigits: number;
  priceCountry: string;
  priceCurrency: string;
  priceSymbol: string;
}

const usePriceInfo = () => {
  const { i18n } = useTranslation();
  let priceInfo: PriceInfo;

  switch (i18n.language) {
    case 'en-GB': {
      priceInfo = {
        fractionDigits: 2,
        priceSymbol: '£',
        priceCountry: 'GB',
        priceCurrency: 'GBP',
      };
      break;
    }

    case 'de': {
      priceInfo = {
        fractionDigits: 2,
        priceSymbol: '€',
        priceCountry: 'DE',
        priceCurrency: 'EUR',
      };
      break;
    }

    default: {
      priceInfo = {
        fractionDigits: 2,
        priceSymbol: '$',
        priceCountry: 'US',
        priceCurrency: 'USD',
      };
      break;
    }
  }

  return { priceInfo };
};

export default usePriceInfo;
