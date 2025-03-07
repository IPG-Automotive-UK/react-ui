import { describe, expect, it } from "vitest";

import { uniqueSortedArray } from "./common";

// array of strings in random order
const defaultArray = [
  "banana",
  "apple",
  "cantaloupe",
  "banana",
  "apple",
  "cantaloupe"
];

describe("uniqueSortedArray utility function", () => {
  it("should sort in ascending order by default and remove dupes", () => {
    // sort and dedupe the array
    const list = uniqueSortedArray(defaultArray);

    expect(list).toEqual(["apple", "banana", "cantaloupe"]);
  });

  it("should sort in descending order and remove dupes", () => {
    // sort and dedupe the array
    const list = uniqueSortedArray(defaultArray, "desc");

    expect(list).toEqual(["cantaloupe", "banana", "apple"]);
  });
});
