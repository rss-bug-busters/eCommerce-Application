import { FC } from 'react';
import PromoCodes from 'public/promoCodes/PromoCodes.json';
import MarqueeElements from './MarqueeElements/MarqueeElements';
import { PromoCodeProperties } from './PromoCodeInterfaces/PromoCodeInterfaces';

const DisplayPromoCodes: FC = function () {
  const dataCodes: PromoCodeProperties[] = PromoCodes.codes;
  const promoCodesRepeats = 6 / dataCodes.length;

  return (
    <div className="relative flex overflow-x-hidden">
      <MarqueeElements
        codes={dataCodes}
        marqueeAnimation="animate-marquee"
        repeat={promoCodesRepeats}
      />

      <MarqueeElements
        codes={dataCodes}
        marqueeAnimation="animate-marquee2"
        repeat={promoCodesRepeats}
      />
    </div>
  );
};

export default DisplayPromoCodes;
