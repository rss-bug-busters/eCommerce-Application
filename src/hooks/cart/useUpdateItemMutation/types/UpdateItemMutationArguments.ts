interface UpdateItemMutationArguments {
  action: 'addLineItem' | 'changeLineItemQuantity';
  cartId: string;
  cartVersion: number;
  lineItemId?: string;
  productId?: string;
  quantity: number;
  variantId: number;
}

export default UpdateItemMutationArguments;
