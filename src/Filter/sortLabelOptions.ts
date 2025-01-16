import { Label } from "../LabelSelector/Label.types";

/**
 * Sorts an array of Label objects in ascending order based on the `name` property.
 */
export const sortLabelOptions = (options: Label[]): Label[] => {
  return options.sort((a, b) => {
    // regex to split the string into an array of numbers and non-numbers
    const regex = /(\d+)|(\D+)/g;
    const aMatches = a.name.match(regex);
    const bMatches = b.name.match(regex);

    // if either string is empty, compare directly
    if (!aMatches || !bMatches) {
      return a.name.localeCompare(b.name);
    }

    // compare each match in the array
    while (aMatches.length && bMatches.length) {
      // Shift the first element from the array
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
