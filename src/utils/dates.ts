const diffInYears = (dateLeft: Date, dateRight: Date): number => {
  let difference = dateLeft.getFullYear() - dateRight.getFullYear();

  if (
    dateLeft.getMonth() < dateRight.getMonth() ||
    (dateLeft.getMonth() === dateRight.getMonth() &&
      dateLeft.getDate() < dateRight.getDate())
  ) {
    difference -= 1;
  }

  return difference;
};

export default diffInYears;
