import useProducts, { UseProductsOptions } from '@hooks/useProducts';
import ItemCard from '@components/ItemCard/ItemCard';

interface Properties extends UseProductsOptions {
  className?: string;
}

function Catalog({ search, sort, className }: Properties) {
  const { data, isSuccess } = useProducts({
    search,
    sort,
  });

  return (
    <div className={`grid justify-center ${className}`} data-testid="catalog">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isSuccess &&
          data.body.results.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Catalog;
