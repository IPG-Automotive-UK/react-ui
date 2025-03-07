import { KeyValueOption } from "../Common.types";

// This function is used to check if an object is of type KeyValueOption
export function isKeyValueOption(obj: unknown): obj is KeyValueOption {
  return !!obj && typeof obj === "object" && "key" in obj && "value" in obj;
}

// function to return unique sorted array of values from a string array
export function uniqueSortedArray(
  array: string[],
  sortOrder: "asc" | "desc" = "asc"
) {
  const uniqueArray = Array.from(new Set(array));
  return uniqueArray.sort((a, b) =>
    sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
}
