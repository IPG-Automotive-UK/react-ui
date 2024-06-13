import { Page } from "@playwright/test";

/**
 * Function to get the iframe context
 * page - Playwright page object
 * @returns iframe context
 * @example getIframeContext(page)
 */
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

/**
 * createDtWithFiles creates a mock data transfer object that can be used for drop events
 * @param {File[]} files
 */
export function createDtWithFiles(files: File[] = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        getAsFile: () => file,
        kind: "file",
        size: file.size,
        type: file.type
      })),
      types: ["Files"]
    }
  };
}
