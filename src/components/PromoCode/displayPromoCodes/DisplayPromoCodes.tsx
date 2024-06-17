import { FC } from 'react';
import MarqueeElements from './MarqueeElements/MarqueeElements';
import promoCodes, { PromoCodeProperties } from './PromoCodes/PromoCodes';

const DisplayPromoCodes: FC = function () {
  const dataCodes: PromoCodeProperties[] = promoCodes;
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
