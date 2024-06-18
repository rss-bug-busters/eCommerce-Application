import Catalog from '@components/Catalog';
import Search from '@components/Search/Search';
import Sort from '@components/Sort/Sort';
import { useProducts } from '@hooks/product';
import FilterSidebar from '@components/FilterSidebar/FilterSidebar';
import useSearchData from '@hooks/useSearchData';

function CatalogPage() {
  const { attributes, search, sort, category, onlyDiscounted, maxPrice, minPrice } =
    useSearchData();

  const { data, hasNextPage, fetchNextPage } = useProducts({
    search,
    sort,
    category,
    limit: 2,
    attributes,
    price: {
      min: minPrice,
      max: maxPrice,
      onlyDiscounted,
    },
  });

  return (
    <div data-testid="catalog-page" className="grid">
      <div>
        <Search className="mx-auto mb-2 sm:w-1/2" />
        <div className="mx-auto mb-5 flex flex-row items-center justify-between sm:w-1/2">
          <Sort />
          <FilterSidebar productsResponse={data?.pages[0]} />
        </div>
      </div>

      <Catalog data={data} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}

export default CatalogPage;
