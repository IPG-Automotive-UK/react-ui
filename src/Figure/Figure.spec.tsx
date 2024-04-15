import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render figure with virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );

  // todo replace this block with better method
  // we need to ensure that image is drawn on canvas before the screenshot is taken
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("canvas");
  await page.waitForTimeout(2000);

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the figure can be rotated correctly
 */
test("should render figure with a rotated virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  await page.locator("#set-angle").click();
  await page
    .getByRole("row", { name: "angle" })
    .getByPlaceholder("Edit number...")
    .fill("90");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("rotated.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the figure can be scaled correctly
 */
test("should render figure with a scaled virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  await page.locator("#set-scale").click();
  await page
    .getByRole("row", { name: "scale" })
    .getByPlaceholder("Edit number...")
    .fill("2");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("scaled.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the figure can be positioned correctly
 */
test("should render figure with a differently positioned virto", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  await page
    .getByRole("row", { name: "x*" })
    .getByPlaceholder("Edit number...")
    .click();
  await page
    .getByRole("row", { name: "x*" })
    .getByPlaceholder("Edit number...")
    .fill("1");
  await page
    .getByRole("row", { name: "y*" })
    .getByPlaceholder("Edit number...")
    .click();
  await page
    .getByRole("row", { name: "y*" })
    .getByPlaceholder("Edit number...")
    .fill("2");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("positioned.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the figure can be sized correctly
 */
test("should render figure with a sized virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  await page.getByRole("button", { name: "Set object" }).click();
  await page
    .getByPlaceholder("Edit JSON string...")
    .fill('{\n  "x": 3,\n  "y": 2\n}');
  await page.getByRole("cell", { name: "size" }).click(); // click away to submit changes
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("sized.png", { maxDiffPixels: 100 });
});
