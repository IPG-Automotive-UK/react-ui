/**
 * Sorts an array of filter options in ascending order. If the filter options are numbers, they will be sorted numerically, otherwise they will be sorted alphabetically. Special characters will be sorted based on their ASCII value.
 */
export const sortFilterOptions = (filterOptions: string[]) => {
  return filterOptions.sort((a, b) => {
    //  If both values are numbers, sort them numerically
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }

    // Otherwise, sort them alphabetically (including special characters)
    return a.localeCompare(b);
  });
};
