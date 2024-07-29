import { describe, expect, test } from "vitest";

import type { LabelChipProps } from "../LabelChip";
import { sortLabelChips } from "./sortLabelChips";

describe("Sort labels", () => {
  test("should sort by length", () => {
    const chips = [
      { label: "Longest" },
      { label: "Short" },
      { label: "Longer" }
    ];
    const sortedChips = sortLabelChips(chips);
    expect(sortedChips).toEqual([
      { label: "Short" },
      { label: "Longer" },
      { label: "Longest" }
    ]);
  });

  test("should sort an empty array", () => {
    const chips: LabelChipProps[] = [];
    const sortedChips = sortLabelChips(chips);
    expect(sortedChips).toEqual([]);
  });

  test("should sort an array with one element", () => {
    const chips = [{ label: "One" }];
    const sortedChips = sortLabelChips(chips);
    expect(sortedChips).toEqual([{ label: "One" }]);
  });

  test("should sort by name if lengths are equal", () => {
    const chips = [{ label: "cat" }, { label: "bat" }, { label: "mat" }];
    const sortedChips = sortLabelChips(chips);
    expect(sortedChips).toEqual([
      { label: "bat" },
      { label: "cat" },
      { label: "mat" }
    ]);
  });

  test("should sort array with labels of varying and same length", () => {
    const chips = [
      { label: "apple" },
      { label: "banana" },
      { label: "kiwi" },
      { label: "pear" },
      { label: "cat" },
      { label: "bat" }
    ];
    const sortedChips = sortLabelChips(chips);
    expect(sortedChips).toEqual([
      { label: "bat" },
      { label: "cat" },
      { label: "kiwi" },
      { label: "pear" },
      { label: "apple" },
      { label: "banana" }
    ]);
  });
});
