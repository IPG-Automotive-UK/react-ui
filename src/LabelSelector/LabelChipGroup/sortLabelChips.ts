import type { LabelChipProps } from "../LabelChip";

/**
 * Sorts label chips first by ascending length and then by alphabetical order if the lengths are equal.
 * @param chips The chips to sort
 * @returns The sorted chips
 */
export const sortLabelChips = (chips: LabelChipProps[]) => {
  return chips.sort((a, b) => {
    if (a.label.length < b.label.length) {
      return -1;
    }
    if (a.label.length > b.label.length) {
      return 1;
    }
    return a.label.localeCompare(b.label);
  });
};
