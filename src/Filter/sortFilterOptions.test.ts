import { describe, expect, it } from "vitest";

import { sortFilterOptions } from "./sortFilterOptions";

describe("sortFilterOptions", () => {
  // sort filter options alphabetically with lowercase
  it("sorts filter options alphabetically with lowercase", () => {
    const filterOptions = ["b", "a", "c"];
    expect(sortFilterOptions(filterOptions)).toEqual(["a", "b", "c"]);
  });

  // sort filter options alphabetically with uppercase
  it("sorts filter options alphabetically with uppercase", () => {
    const filterOptions = ["B", "A", "C"];
    expect(sortFilterOptions(filterOptions)).toEqual(["A", "B", "C"]);
  });

  // sort filter options alphabetically with mixed case
  it("sorts filter options alphabetically with mixed case", () => {
    const filterOptions = ["b", "A", "C", "B"];
    expect(sortFilterOptions(filterOptions)).toEqual(["A", "b", "B", "C"]);
  });

  // sort filter options alphabetically with numbers
  it("sorts filter options alphabetically with numbers", () => {
    const filterOptions = ["2", "1", "10", "3"];
    expect(sortFilterOptions(filterOptions)).toEqual(["1", "2", "3", "10"]);
  });

  // sort filter options alphabetically with special characters
  it("sorts filter options alphabetically with special characters", () => {
    const filterOptions = ["@", "!", "#", "$"];
    expect(sortFilterOptions(filterOptions)).toEqual(["!", "@", "#", "$"]);
  });

  // returns empty array when filter options is empty
  it("returns empty array when filter options is empty", () => {
    const filterOptions: string[] = [];
    expect(sortFilterOptions(filterOptions)).toEqual([]);
  });

  // sorts alpha-numeric mix
  it("sorts alpha-numeric mix", () => {
    const filterOptions = ["Gate 10", "Gate 4", "Gate 5", "Gate 1"];
    expect(sortFilterOptions(filterOptions)).toEqual([
      "Gate 1",
      "Gate 4",
      "Gate 5",
      "Gate 10"
    ]);
  });

  // sorts semantic versioning strings
  it("sorts semantic versioning strings", () => {
    const filterOptions = [
      "11.0.0",
      "10.0.0",
      "100.0.0",
      "1.0.0",
      "1.0.1",
      "1.0.10",
      "1.0.2",
      "1.1.0"
    ];
    expect(sortFilterOptions(filterOptions)).toEqual([
      "1.0.0",
      "1.0.1",
      "1.0.2",
      "1.0.10",
      "1.1.0",
      "10.0.0",
      "11.0.0",
      "100.0.0"
    ]);
  });

  // sort with all types of characters
  it("sorts filter options with all types of characters", () => {
    const filterOptions = [
      "!",
      "2",
      "1",
      "10",
      "Gate 10",
      "Gate 4",
      "Gate 5",
      "@",
      "3",
      "b",
      "A",
      "C",
      "B",
      "Gate 1"
    ];
    expect(sortFilterOptions(filterOptions)).toEqual([
      "!",
      "@",
      "1",
      "2",
      "3",
      "10",
      "A",
      "b",
      "B",
      "C",
      "Gate 1",
      "Gate 4",
      "Gate 5",
      "Gate 10"
    ]);
  });
});
