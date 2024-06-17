interface ApplyPromoCodeArguments {
  action: 'addDiscountCode';
  cartId: string;
  cartVersion: number;
  code: string;
}

export default ApplyPromoCodeArguments;
