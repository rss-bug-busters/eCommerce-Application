export const postalCodeRegexes: Record<string, RegExp> = {
  PL: /^\d{2}-\d{3}$/,
  BY: /^\d{6}$/,
  RU: /^\d{6}$/,
};

export const validatePostalCode = (country: string, postalCode: string) => {
  const countryRegex = postalCodeRegexes[country];

  if (!countryRegex) {
    return false;
  }

  return countryRegex.test(postalCode);
};
