import { expect, test } from "@playwright/test";

/**
 * Test to check that the initial tab content is rendered correctly.
 */
test("should render the content of the initially active tab", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/layout-tabpanel--default"
  );

  // Check if the content of the first tab is visible
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("text=Project Code*")
      .first()
  ).toBeVisible();

  // Verify that content from other tabs is not visible
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("text=Part Name*")
      .first()
  ).not.toBeVisible();
});

/**
 * Test to check that clicking a tab switches to its content.
 */
test("should switch content when tabs are clicked", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/layout-tabpanel--default"
  );

  // Click the second tab
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("text=Select Part")
    .click();

  // Verify that the content of the second tab is now visible
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("text=Part Name*")
      .first()
  ).toBeVisible();

  // Verify that the content from the first tab is not visible anymore
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("text=Project Code*")
      .first()
  ).not.toBeVisible();
});

/**
 * Test to verify the aria-label attribute based on the variant prop.
 */
test("should set the aria-label attribute based on the variant prop", async ({
  page
}) => {
  // Go to the default variant page
  await page.goto(
    "http://localhost:6006/?path=/story/layout-tabpanel--default"
  );
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Verify 'full width tabs' aria-label on default variant
  const fullWidthFrame = page.frameLocator(
    'iframe[title="storybook-preview-iframe"]'
  );
  await expect(fullWidthFrame.locator('[role="tablist"]')).toHaveAttribute(
    "aria-label",
    "full width tabs"
  );

  // Go to the standard variant page
  await page.goto(
    "http://localhost:6006/?path=/story/layout-tabpanel--standard"
  );
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Verify 'standard width tabs' aria-label on standard variant
  const standardWidthFrame = page.frameLocator(
    'iframe[title="storybook-preview-iframe"]'
  );
  await expect(standardWidthFrame.locator('[role="tablist"]')).toHaveAttribute(
    "aria-label",
    "standard width tabs"
  );
});

/**
 * Test to check custom children are rendered correctly.
 */
test("should render custom children", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/layout-tabpanel--custom-children"
  );

  // Verify that the custom children are rendered, in this case a ADD TO DOWNLOAD button
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("button", { name: "ADD TO DOWNLOAD" })
  ).toBeVisible();
});
