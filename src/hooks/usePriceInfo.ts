import { useTranslation } from 'react-i18next';

interface PriceInfo {
  priceCountry: string;
  priceCurrency: string;
}

const usePriceInfo = () => {
  const { i18n } = useTranslation();
  let priceInfo: PriceInfo;

  switch (i18n.language) {
    case 'en-GB': {
      priceInfo = {
        priceCountry: 'GB',
        priceCurrency: 'GBP',
      };
      break;
    }

    case 'de': {
      priceInfo = {
        priceCountry: 'DE',
        priceCurrency: 'EUR',
      };
      break;
    }

    default: {
      priceInfo = {
        priceCountry: 'US',
        priceCurrency: 'USD',
      };
      break;
    }
  }

  return { priceInfo };
};

export default usePriceInfo;
