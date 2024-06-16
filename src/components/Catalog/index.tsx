import ItemCard from '@components/ItemCard/ItemCard';
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { InfiniteData } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

interface Properties {
  className?: string;
  data?:
    | InfiniteData<ClientResponse<ProductProjectionPagedSearchResponse>, unknown>
    | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading?: boolean;
}

function Catalog({ className, data, fetchNextPage, hasNextPage, isLoading }: Properties) {
  const [allRows, setAllRows] = useState<ProductProjection[]>([]);

  useEffect(() => {
    setAllRows(data?.pages.flatMap((d) => d.body.results) ?? []);
  }, [data?.pages]);

  return (
    <div className={`grid justify-center ${className}`} data-testid="catalog">
      {allRows?.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          <h3>No products found</h3>
        </div>
      )}
      <InfiniteScroll
        next={() => {
          if (!isLoading) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
        loader={isLoading && <h4>Loading...</h4>}
        dataLength={allRows ? allRows.length : 0}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allRows.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Catalog;
