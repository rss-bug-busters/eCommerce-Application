import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchSVG from '@assets/svg/search.svg?react';

export interface SearchProperties {
  className?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function Search({ className, setSearch }: SearchProperties) {
  const debounced = useDebouncedCallback((event: React.FormEvent<HTMLInputElement>) => {
    setSearch((event.target as HTMLInputElement).value);
  }, 250);

  return (
    <div className={`grid w-full ${className ?? ''}`} data-testid="search">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchSVG className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          name="search"
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-950 dark:focus:border-zinc-950"
          placeholder="Search Mockups, Logos..."
          required
          onInput={debounced}
          aria-label="search"
        />
      </div>
    </div>
  );
}

export default Search;
