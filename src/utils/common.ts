import { KeyValueOption } from "../Common.types";
import { Page } from "@playwright/test";

// This function is used to check if an object is of type KeyValueOption
export function isKeyValueOption(obj: unknown): obj is KeyValueOption {
  return !!obj && typeof obj === "object" && "key" in obj && "value" in obj;
}

// function to return unique sorted array of values from a string array
export function uniqueSortedArray(array: string[], sortOrder?: "asc" | "desc") {
  const uniqueArray = Array.from(new Set(array));
  return uniqueArray.sort((a, b) =>
    sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
}

// Helper function to wait for the iframe and switch to its context
export async function getIframeContext(page: Page) {
  const iframeElement = await page.waitForSelector(
    'iframe[title="storybook-preview-iframe"]'
  );
  const iframe = await iframeElement.contentFrame();
  if (!iframe) {
    throw new Error("Unable to find or access the iframe content.");
  }
  return iframe;
}
