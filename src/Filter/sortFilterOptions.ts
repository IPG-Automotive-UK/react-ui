/**
 * Sorts an array of filter options in ascending order. If the filter options are numbers, they will be sorted numerically, otherwise they will be sorted alphabetically. Special characters will be sorted based on their ASCII value.
 */
export const sortFilterOptions = (filterOptions: string[]) => {
  return filterOptions.sort((a, b) => {
    // regex to split the string into an array of numbers and non-numbers
    const regex = /(\d+)|(\D+)/g;
    const aMatches = a.match(regex);
    const bMatches = b.match(regex);

    // if either string is empty, return the other string
    if (!aMatches || !bMatches) {
      return a.localeCompare(b);
    }

    // compare each match in the array
    while (aMatches.length && bMatches.length) {
      // shift the first element from the array
      const aMatch = aMatches.shift();
      const bMatch = bMatches.shift();

      // if either match is undefined, return the other match
      if (!aMatch || !bMatch) {
        return aMatch ? 1 : -1;
      }

      // if the match is a number, compare numerically
      const aNum = parseFloat(aMatch);
      const bNum = parseFloat(bMatch);

      // if both are numbers, compare numerically
      if (!isNaN(aNum) && !isNaN(bNum)) {
        if (aNum !== bNum) {
          return aNum - bNum;
        }
      } else {
        // else compare alphabetically
        if (aMatch !== bMatch) {
          return aMatch.localeCompare(bMatch);
        }
      }
    }

    // if the lengths are not equal, the shorter string should come first
    return aMatches.length - bMatches.length;
  });
};
