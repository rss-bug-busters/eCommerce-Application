import SortType from '../utils/sortType';
import Price from './Price';

interface UseProductsOptions {
  attributes?: Record<string, string[]>;
  category?: string;
  limit?: number;
  offset?: number;
  price?: Price;
  search?: string;
  sort?: keyof typeof SortType;
}

export default UseProductsOptions;
