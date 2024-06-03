import Catalog from '@components/Catalog/Catalog';
import Search from '@components/Search/Search';
import Sort from '@components/Sort/Sort';
import useProducts from '@hooks/useProducts';
import FilterSidebar from '@components/FilterSidebar/FilterSidebar';
import useSearchData from '@hooks/useSearchData';

function CatalogPage() {
  const { search, sort, category, onlyDiscounted, maxPrice, minPrice } = useSearchData();

  const { data } = useProducts({
    search,
    sort,
    category,
    limit: 12,
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
          <FilterSidebar />
        </div>
      </div>

      <Catalog data={data} />
    </div>
  );
}

export default CatalogPage;
