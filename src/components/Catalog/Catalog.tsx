import ItemCard from '@components/ItemCard/ItemCard';
import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

interface Properties {
  className?: string;
  data?: ClientResponse<ProductProjectionPagedSearchResponse>;
}

function Catalog({ className, data }: Properties) {
  return (
    <div className={`grid justify-center ${className}`} data-testid="catalog">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.body.results.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;