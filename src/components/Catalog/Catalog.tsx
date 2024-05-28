import useProducts from '@hooks/useProducts';
import ItemCard from '@components/ItemCard/ItemCard';

interface Properties {
  filter?: string;
  search?: string;
  sort?: string;
}

function Catalog(properties: Properties) {
  const { data, isSuccess, isError, error } = useProducts({
    // sort: {
    //   field: 'price',
    //   // local: 'en-US',
    //   order: 'asc',
    // },
  });

  console.log(properties);

  if (isSuccess) {
    console.log(data.body.results);
  }

  if (isError) {
    console.log(error);
  }

  return (
    <div className="grid justify-center" data-testid="catalog">
      <h1>Catalog</h1>
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
