import { FC } from 'react';

import usePromoCodes from '@hooks/promoCodes/usePromoCodes';
import MarqueeElements from './MarqueeElements/MarqueeElements';

const PromoCodesBox: FC = function () {
  const promoCodes = usePromoCodes();
  const Codes = promoCodes.data?.body.results;
  const promoCodesRepeats = 6 / (Codes?.length ?? 1);

  return (
    <div className="relative flex overflow-x-hidden">
      {Codes && (
        <MarqueeElements
          codes={Codes}
          marqueeAnimation="animate-marquee"
          repeat={promoCodesRepeats}
        />
      )}

      {Codes && (
        <MarqueeElements
          codes={Codes}
          marqueeAnimation="animate-marquee2"
          repeat={promoCodesRepeats}
        />
      )}
    </div>
  );
};

export default PromoCodesBox;
