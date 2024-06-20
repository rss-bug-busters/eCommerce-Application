import { LineItem } from '@commercetools/platform-sdk';

interface RemoveItemMutationArguments {
  callback?: () => void;
  cartVersion?: number;
  item: LineItem;
}

export default RemoveItemMutationArguments;
