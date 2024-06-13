import Sort from '@hooks/product/useProducts/types/Sort';

const sortType: Record<string, Sort> = {
  priceAsk: {
    field: 'price',
    needLocal: false,
    order: 'asc',
  },
  priceDesk: {
    field: 'price',
    needLocal: false,
    order: 'desc',
  },
  titleAsk: {
    field: 'name',
    needLocal: true,
    order: 'asc',
  },
  titleDesk: {
    field: 'name',
    needLocal: true,
    order: 'desc',
  },
};

export default sortType;
