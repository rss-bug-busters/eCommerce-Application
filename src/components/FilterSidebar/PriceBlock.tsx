import Toggle from '@components/ui/Toggle/Toggle';
import usePriceInfo from '@hooks/usePriceInfo';
import { useSearchParams } from 'react-router-dom';
import { FormEvent } from 'react';
import useSearchData from '@hooks/useSearchData';

function PriceBlock() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const { priceInfo } = usePriceInfo();
  const { minPrice, maxPrice, onlyDiscounted } = useSearchData();

  const onInput = (key: string) => (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (
      key === 'minPrice' &&
      target &&
      maxPrice &&
      +target.value * 10 ** priceInfo.fractionDigits >= maxPrice
    ) {
      target.value = String(maxPrice ? maxPrice / 10 ** priceInfo.fractionDigits : '');
    }

    if (target && (target.value === '' || +target.value < 0)) {
      target.value = '';
      setSearchParameters({
        ...Object.fromEntries(searchParameters.entries()),
        [key]: [],
      });
    } else {
      setSearchParameters({
        ...Object.fromEntries(searchParameters.entries()),
        [key]: String(+target.value * 10 ** priceInfo.fractionDigits),
      });
    }
  };

  const onToggle = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      setSearchParameters({
        ...Object.fromEntries(searchParameters.entries()),
        onlyDiscounted: 'true',
      });
    } else {
      setSearchParameters({
        ...Object.fromEntries(searchParameters.entries()),
        onlyDiscounted: 'false',
      });
    }
  };

  return (
    <div>
      <h3 className="mb-1 text-xl">Price:</h3>
      <div className="mb-3">
        From:
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          value={minPrice ? minPrice / 10 ** priceInfo.fractionDigits : ''}
          onInput={onInput('minPrice')}
        />
        To:
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="5"
          required
          value={maxPrice ? maxPrice / 10 ** priceInfo.fractionDigits : ''}
          onInput={onInput('maxPrice')}
        />
      </div>
      <Toggle toggleName="Only discounted" checked={onlyDiscounted} onChange={onToggle} />
    </div>
  );
}

export default PriceBlock;
