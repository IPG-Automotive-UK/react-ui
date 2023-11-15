import { KeyValueOption } from "../Common.types";

// This function is used to check if an object is of type KeyValueOption
export function isKeyValueOption<T>(obj: T): obj is T & KeyValueOption {
  return obj && typeof obj === "object" && "key" in obj && "value" in obj;
}
