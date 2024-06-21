import { FC } from 'react';
import { toast } from 'react-toastify';
import { PromoCodeProperties } from '../PromoCodes/PromoCodes';

const repeatCodes = (
  codesToRepeat: PromoCodeProperties[],
  times: number
): PromoCodeProperties[] => {
  let repeatedCodes: PromoCodeProperties[] = [];

  for (let index = 0; index < times; index += 1) {
    repeatedCodes = [...repeatedCodes, ...codesToRepeat];
  }

  return repeatedCodes;
};

interface MarqueeElementsProperties {
  codes: PromoCodeProperties[];
  marqueeAnimation: 'animate-marquee' | 'animate-marquee2';
  repeat: number;
}

const MarqueeElements: FC<MarqueeElementsProperties> = function ({
  codes,
  marqueeAnimation,
  repeat,
}) {
  const repeatedCodes = repeatCodes(codes, repeat);

  return (
    <div
      className={`${marqueeAnimation === 'animate-marquee' ? '' : 'absolute top-0'} py-2 ${marqueeAnimation} flex items-center justify-center whitespace-nowrap`}
    >
      {repeatedCodes.map((code) => {
        const handleCopy = () => {
          navigator.clipboard
            .writeText(code.code)
            .then(() => toast.info(`Promo Code: ${code.code} copied to clipboard`))
            .catch((error: string) => {
              toast.error(error);
            });
        };

        return (
          <div
            className="flex flex-row items-center"
            key={`code-${Math.random().toString(36).slice(2, 9)}`}
          >
            <span className="mx-4 text-lg font-bold">Promo Code:</span>
            <button
              type="button"
              className="btn btn-secondary flex items-center gap-2"
              onClick={handleCopy}
            >
              {code.description && (
                <span className=" text-sm font-semibold italic text-red-500">
                  {code.description}
                </span>
              )}
              <span className=" text-lg font-bold ">{code.code}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MarqueeElements;
