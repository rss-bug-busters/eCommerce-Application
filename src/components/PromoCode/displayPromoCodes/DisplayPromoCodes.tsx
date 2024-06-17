import { FC, useEffect, useState } from 'react';
import MarqueeElements from './MarqueeElements/MarqueeElements';
import {
  PromoCodeProperties,
  PromoCodesProperties,
} from './PromoCodeInterfaces/PromoCodeInterfaces';

const DisplayPromoCodes: FC = function () {
  const [dataCodes, setDataCodes] = useState<PromoCodeProperties[] | []>([]);
  const getData = () => {
    fetch('public/promoCodes/promoCodes.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((myJson: PromoCodesProperties) => setDataCodes(myJson.codes))
      .catch((error: Error) => {
        throw new Error('Unable to fetch PromoCodes', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const promoCodesRepeats = 6 / (dataCodes.length ?? 1);

  return (
    <div className="relative flex overflow-x-hidden">
      {dataCodes && (
        <MarqueeElements
          codes={dataCodes}
          marqueeAnimation="animate-marquee"
          repeat={promoCodesRepeats}
        />
      )}

      {dataCodes && (
        <MarqueeElements
          codes={dataCodes}
          marqueeAnimation="animate-marquee2"
          repeat={promoCodesRepeats}
        />
      )}
    </div>
  );
};

export default DisplayPromoCodes;
