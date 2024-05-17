export const postalCodeRegexes: Record<string, RegExp> = {
  PLN: /^\d{2}-\d{3}$/,
  BLR: /^\d{6}$/,
  RUS: /^\d{6}$/,
};

export const validatePostalCode = (country: string, postalCode: string) => {
  const countryRegex = postalCodeRegexes[country];

  if (!countryRegex) {
    return false;
  }

  return countryRegex.test(postalCode);
};
