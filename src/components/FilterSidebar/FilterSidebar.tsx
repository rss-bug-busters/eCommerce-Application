import { useEffect, useRef, useState } from 'react';
import useCategory from '@hooks/useCategory';
import FilterSvg from '@assets/svg/filter.svg?react';
import Sidebar from '@components/FilterSidebar/Sidebar';
import clsx from 'clsx';
import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

function FilterSidebar({
  productsResponse,
}: {
  productsResponse: ClientResponse<ProductProjectionPagedSearchResponse> | undefined;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarReference = useRef(null);
  const { data } = useCategory();

  const handleOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if ((event.target as HTMLElement)?.id === 'category-sidebar') {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        className={clsx(
          'flex w-fit max-w-sm items-center gap-1 rounded-lg p-2',
          'dark:bg-zinc-800 hover:dark:bg-zinc-700'
        )}
        type="button"
        onClick={handleOpen}
      >
        <FilterSvg className="h-5 w-5" />
        Filters
      </button>
      {isSidebarOpen && (
        <div ref={sidebarReference}>
          <Sidebar
            hide={!isSidebarOpen}
            productsResponse={productsResponse}
            category={data?.body.results ?? []}
          />
        </div>
      )}
    </div>
  );
}

export default FilterSidebar;
