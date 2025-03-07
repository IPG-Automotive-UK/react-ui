import { describe, expect, it } from "vitest";

import { uniqueSortedArray } from "./common";

// item array using an object array structure
const defaultArray = [
  "banana",
  "apple",
  "cantaloupe",
  "banana",
  "apple",
  "cantaloupe"
];

describe("uniqueSortedArray utility function", () => {
  it("should sort ascending by default and dupes removed", () => {
    // get list
    const list = uniqueSortedArray(defaultArray);

    expect(list).toEqual(["apple", "banana", "cantaloupe"]);
  });

  it("should sort descending and dupes removed", () => {
    // get list
    const list = uniqueSortedArray(defaultArray, "desc");

    expect(list).toEqual(["cantaloupe", "banana", "apple"]);
  });
});
