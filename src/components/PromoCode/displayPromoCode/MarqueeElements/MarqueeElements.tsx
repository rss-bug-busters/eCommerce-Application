import { DiscountCode } from '@commercetools/platform-sdk';
import { FC } from 'react';
import { toast } from 'react-toastify';

const repeatCodes = (codesToRepeat: DiscountCode[], times: number): DiscountCode[] => {
  let repeatedCodes: DiscountCode[] = [];

  for (let index = 0; index < times; index += 1) {
    repeatedCodes = [...repeatedCodes, ...codesToRepeat];
  }

  return repeatedCodes;
};

interface MarqueeElementsProperties {
  codes: DiscountCode[];
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
      className={`${marqueeAnimation === 'animate-marquee' ? '' : 'absolute top-0'} py-12 ${marqueeAnimation} flex items-center justify-center whitespace-nowrap`}
    >
      {repeatedCodes.map((code) => {
        const handleCopy = () => {
          navigator.clipboard
            .writeText(code.code)
            .then(() => toast.info(`PromoCode: ${code.code} copied to clipboard`))
            .catch((error: string) => {
              toast.error(error);
            });
        };
        const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === ' ') {
            event.preventDefault();
            handleCopy();
          }
        };

        return (
          <div
            className="flex flex-row items-center"
            key={`code-${Math.random().toString(36).slice(2, 9)}`}
          >
            <span className="mx-4 text-lg font-bold">PromoCode:</span>
            <div
              role="button"
              className="flex cursor-pointer flex-row items-center rounded-lg border-2 p-2 shadow-[inset_0px_1px_15px_-10px_rgba(66,68,90,1)]"
              onClick={handleCopy}
              onKeyUp={handleKeyPress}
              tabIndex={0}
            >
              {code.description && (
                <span className=" text-sm font-semibold italic text-red-500">
                  {code.description['en-US']}
                </span>
              )}
              <span className="mx-4  rounded-lg border-2 bg-slate-100 p-2 text-lg">
                {code.code}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarqueeElements;
