import PriceBlock from '@components/FilterSidebar/PriceBlock';
import CategoryDropdown from '@components/CategoryDropdown/CategoryDropdown';
import { categoryTree } from '@components/CategoryDropdown/utils/categoryTree';
import {
  Category,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
  TermFacetResult,
} from '@commercetools/platform-sdk';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import Sort from '@components/Sort/Sort';
import useSearchData from '@hooks/useSearchData';
import { useSearchParams } from 'react-router-dom';
import filterAttributes from '@utils/consts/filterAtributes';
import { ReactElement, SyntheticEvent } from 'react';

const Sidebar = ({
  category,
  hide,
  productsResponse,
}: {
  category: Category[];
  hide: boolean;
  productsResponse?: ClientResponse<ProductProjectionPagedSearchResponse>;
}) => {
  const { reset, attributes } = useSearchData();
  const [searchParameters, setSearchParameters] = useSearchParams();

  const facets = productsResponse?.body.facets;

  return ReactDOM.createPortal(
    <div
      className={clsx('fixed top-0 z-10 flex  h-full min-w-full justify-end', {
        hidden: hide,
      })}
      id="category-sidebar"
    >
      <div
        className={clsx(
          'h-full min-w-80 overflow-auto scroll-auto border border-gray-200 bg-white p-4 shadow',
          'dark:border-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white'
        )}
      >
        <div className="flex flex-row justify-between">
          <h2 className="mb-6 mt-4 text-2xl">Filters:</h2>
          <button onClick={reset} type="button">
            Reset
          </button>
        </div>
        <PriceBlock />
        <h3 className="text-xl">Sort:</h3>
        <Sort />
        <h3 className="text-xl">Category:</h3>
        <CategoryDropdown nodes={category ? categoryTree(category) : []} />
        {Object.entries(facets ?? {}).map(([key, value]): ReactElement | undefined => {
          const atr = filterAttributes.find(({ name }) => name === key);

          const selectHandler = (event: SyntheticEvent<HTMLSelectElement, Event>) => {
            const { value: v } = event.target as HTMLInputElement;

            setSearchParameters({
              ...Object.fromEntries(searchParameters.entries()),
              [key]: v,
            });
          };

          if (atr && (value as TermFacetResult).total > 0) {
            return (
              <div key={key}>
                <p>{key}</p>
                <select
                  className="`flex h-12 w-64 items-center justify-start rounded-full border bg-transparent px-4 py-3"
                  key={key}
                  onChange={selectHandler}
                  value={attributes[key]?.find((item) => item !== '') ?? ''}
                >
                  <option className="bg-zinc-800" value="">
                    Choose a sort type
                  </option>
                  {(value as TermFacetResult).terms.map(
                    ({ term }: { count: number; term: string }) => (
                      <option className="bg-zinc-800" key={term} value={term}>
                        {term}
                      </option>
                    )
                  )}
                </select>
              </div>
            );
          }

          return undefined;
        })}
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
