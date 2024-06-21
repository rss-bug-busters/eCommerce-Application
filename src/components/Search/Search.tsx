import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchSVG from '@assets/svg/search.svg?react';
import { useSearchParams } from 'react-router-dom';
import useSearchData from '@hooks/useSearchData.ts';

export interface SearchProperties {
  className?: string;
}

function Search({ className }: SearchProperties) {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const { search } = useSearchData();

  const debounced = useDebouncedCallback((event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setSearchParameters({
      ...Object.fromEntries(searchParameters.entries()),
      search: target.value,
    });
  }, 250);

  return (
    <div className={`grid w-full ${className ?? ''}`} data-testid="search">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <SearchSVG className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          name="search"
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-zinc-950 dark:focus:ring-zinc-950"
          placeholder="Product search..."
          required
          onInput={debounced}
          aria-label="search"
          defaultValue={search}
        />
      </div>
    </div>
  );
}

export default Search;
