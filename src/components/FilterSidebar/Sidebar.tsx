import PriceBlock from '@components/FilterSidebar/PriceBlock';
import CategoryDropdown from '@components/CategoryDropdown/CategoryDropdown';
import { categoryTree } from '@components/CategoryDropdown/utils/categoryTree';
import { Category } from '@commercetools/platform-sdk';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

const Sidebar = ({ data, hide }: { data: Category[]; hide: boolean }) =>
  ReactDOM.createPortal(
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
        <h2 className="mb-6 mt-4 text-2xl">Filters:</h2>
        <PriceBlock />
        <h3 className="text-xl">Category:</h3>
        <CategoryDropdown nodes={data ? categoryTree(data) : []} />
      </div>
    </div>,
    document.body
  );

export default Sidebar;
