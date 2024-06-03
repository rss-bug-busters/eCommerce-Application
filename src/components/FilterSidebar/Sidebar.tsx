import PriceBlock from '@components/FilterSidebar/PriceBlock';
import CategoryDropdown from '@components/CategoryDropdown/CategoryDropdown';
import { categoryTree } from '@components/CategoryDropdown/utils/categoryTree';
import {
  Category,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import Sort from '@components/Sort/Sort';
import useSearchData from '@hooks/useSearchData';

const Sidebar = ({
  category,
  hide,
}: {
  category: Category[];
  hide: boolean;
  productsResponse?: ClientResponse<ProductProjectionPagedSearchResponse>;
}) => {
  const { reset } = useSearchData();

  return ReactDOM.createPortal(
    <div
      className={clsx('fixed top-0 z-10 flex  h-full min-w-full justify-end', {
        hidden: hide,
      })}
      id="category-sidebar"
    >
      <div
        className={clsx(
          'h-full min-w-80 border border-gray-200 bg-white p-4 shadow',
          'dark:border-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white'
        )}
      >
        <div className="flex flex-row justify-between">
          <h2 className="mb-6 mt-4 text-2xl">Filters:</h2>
          <button onClick={() => reset()} type="button">
            Reset
          </button>
        </div>
        <PriceBlock />
        <h3 className="text-xl">Sort:</h3>
        <Sort />
        <h3 className="text-xl">Category:</h3>
        <CategoryDropdown nodes={category ? categoryTree(category) : []} />
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
