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
